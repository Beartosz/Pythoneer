/* ════════════════════════════════════════════════════════════════
   runner.worker.js — runs learner code with Pyodide (CPython in WASM)

   This worker hosts a single long-lived Pyodide instance. The main
   thread (runner.js) posts {type:"run", id, code, tests, stdin} and
   receives {type:"result", id, result}. Running in a Worker lets the
   main thread enforce a hard timeout by terminating us on a runaway
   loop — no SharedArrayBuffer / cross-origin isolation required.

   The Python "kernel" below reproduces the exact contract the old
   server.py runner had, so app.js is untouched:
     - run code in ns={"__name__":"__main__"}, capturing stdout+stderr
     - on error: ok=false, error=traceback, traceback appended to output
     - expose ns["__stdout__"] to checks
     - run each test in a COPY of the namespace; AssertionError message
       (or fail_msg) on failure
     - return {stdout, stderr, ok, error, tests:[{name,passed,message}],
       images:[{name,mime,data}]}
   ════════════════════════════════════════════════════════════════ */

const PYODIDE_VERSION = "v0.26.4";
const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/" + PYODIDE_VERSION + "/full/";

importScripts(PYODIDE_URL + "pyodide.js");

/* The Python kernel. String.raw keeps backslashes (regex \b, \s) literal.
   The Python contains no `${` so it is safe inside a template literal. */
const KERNEL = String.raw`
import sys, io, json, os, re, base64, types, builtins, traceback, contextlib

_IMAGE_TYPES = {".png": "image/png", ".jpg": "image/jpeg",
                ".jpeg": "image/jpeg", ".svg": "image/svg+xml"}
_MAX_IMAGE_BYTES = 4 * 1024 * 1024


def _clear_images():
    """Remove image files from a previous run so we only return this run's."""
    try:
        names = os.listdir(".")
    except OSError:
        return
    for name in names:
        if os.path.splitext(name)[1].lower() in _IMAGE_TYPES:
            try:
                os.remove(name)
            except OSError:
                pass


def _collect_images():
    """Base64 any images the learner's code wrote to the working dir."""
    out = []
    try:
        names = sorted(os.listdir("."))
    except OSError:
        return out
    for name in names:
        mime = _IMAGE_TYPES.get(os.path.splitext(name)[1].lower())
        if not mime:
            continue
        try:
            if os.path.getsize(name) > _MAX_IMAGE_BYTES:
                continue
            with open(name, "rb") as fh:
                data = base64.b64encode(fh.read()).decode("ascii")
        except OSError:
            continue
        out.append({"name": name, "mime": mime, "data": data})
        if len(out) >= 6:
            break
    return out


def _install_stdin(stdin_text):
    """Make input() consume lines from the provided text (EOFError when spent)."""
    lines = stdin_text.split("\n") if stdin_text else []
    it = iter(lines)

    def _input(prompt=""):
        if prompt:
            sys.stdout.write(str(prompt))
        try:
            return next(it)
        except StopIteration:
            raise EOFError("EOF when reading a line")

    builtins.input = _input


def _maybe_install_requests_mock(code):
    """Browsers can't make raw HTTP calls, so the requests track runs against a
    deterministic offline shim. Only injected when the code imports requests."""
    if not re.search(r"(^|\n)\s*(import\s+requests|from\s+requests\s+import)", code):
        return
    existing = sys.modules.get("requests")
    if existing is not None and not getattr(existing, "_pythoneer_mock", False):
        return

    mod = types.ModuleType("requests")
    mod._pythoneer_mock = True

    class RequestException(Exception):
        pass

    class HTTPError(RequestException):
        pass

    class _Resp:
        def __init__(self, data, status=200, headers=None):
            self._data = data
            self.status_code = status
            self.headers = headers or {"content-type": "application/json"}
            self.text = data if isinstance(data, str) else json.dumps(data)

        def json(self):
            return self._data

        @property
        def ok(self):
            return self.status_code < 400

        def raise_for_status(self):
            if self.status_code >= 400:
                raise HTTPError("HTTP %d" % self.status_code)

    def _route(url, **kw):
        u = str(url)
        if "httpbin.org/json" in u:
            return _Resp({"slideshow": {"author": "Yours Truly",
                                        "title": "Sample Slide Show",
                                        "slides": [{"title": "Wake up!", "type": "all"}]}})
        if "httpbin.org/get" in u:
            return _Resp({"args": kw.get("params") or {},
                          "headers": kw.get("headers") or {}, "url": u})
        if "httpbin.org/post" in u:
            return _Resp({"json": kw.get("json"), "data": kw.get("data", ""),
                          "headers": kw.get("headers") or {}, "url": u})
        if "api.github.com" in u:
            return _Resp({"current_user_url": "https://api.github.com/user",
                          "emojis_url": "https://api.github.com/emojis"},
                         headers={"content-type": "application/json; charset=utf-8"})
        return _Resp({"url": u, "args": kw.get("params") or {}})

    mod.get = lambda url, **kw: _route(url, **kw)
    mod.post = lambda url, **kw: _route(url, **kw)
    mod.put = lambda url, **kw: _route(url, **kw)
    mod.delete = lambda url, **kw: _route(url, **kw)
    mod.head = lambda url, **kw: _route(url, **kw)
    mod.patch = lambda url, **kw: _route(url, **kw)
    mod.Response = _Resp
    mod.RequestException = RequestException
    mod.HTTPError = HTTPError
    mod.exceptions = types.SimpleNamespace(RequestException=RequestException, HTTPError=HTTPError)
    sys.modules["requests"] = mod


def _maybe_install_fastapi_shim(code):
    """The FastAPI lessons only define an app and call handlers directly — they
    never run a server. A tiny shim provides FastAPI/APIRouter so imports work
    without the heavy (and fragile) real ASGI stack. Pydantic is installed for
    real, so model validation in those lessons behaves exactly like production."""
    if not re.search(r"(^|\n)\s*(import\s+fastapi|from\s+fastapi\s+import)", code):
        return
    existing = sys.modules.get("fastapi")
    if existing is not None and not getattr(existing, "_pythoneer_mock", False):
        return

    mod = types.ModuleType("fastapi")
    mod._pythoneer_mock = True

    def _identity_deco(*a, **k):
        def deco(fn):
            return fn
        return deco

    class _Router:
        def __init__(self, *a, **k):
            pass

        def get(self, *a, **k):
            return _identity_deco()

        def post(self, *a, **k):
            return _identity_deco()

        def put(self, *a, **k):
            return _identity_deco()

        def delete(self, *a, **k):
            return _identity_deco()

        def patch(self, *a, **k):
            return _identity_deco()

        def options(self, *a, **k):
            return _identity_deco()

        def head(self, *a, **k):
            return _identity_deco()

        def include_router(self, *a, **k):
            pass

        def add_api_route(self, *a, **k):
            pass

    class HTTPException(Exception):
        def __init__(self, status_code=400, detail=None):
            super().__init__(detail)
            self.status_code = status_code
            self.detail = detail

    def _param(default=None, *a, **k):
        return default

    mod.FastAPI = type("FastAPI", (_Router,), {})
    mod.APIRouter = type("APIRouter", (_Router,), {})
    mod.HTTPException = HTTPException
    mod.Query = _param
    mod.Path = _param
    mod.Body = _param
    mod.Header = _param
    mod.Depends = _param
    sys.modules["fastapi"] = mod


def pythoneer_run(code, tests, stdin):
    _clear_images()
    _install_stdin(stdin or "")
    try:
        _maybe_install_requests_mock(code)
    except Exception:
        pass
    try:
        _maybe_install_fastapi_shim(code)
    except Exception:
        pass

    result = {"stdout": "", "stderr": "", "ok": True, "error": None, "tests": []}
    ns = {"__name__": "__main__"}
    buf = io.StringIO()

    try:
        with contextlib.redirect_stdout(buf), contextlib.redirect_stderr(buf):
            exec(compile(code, "<your code>", "exec"), ns)
    except SystemExit:
        pass
    except BaseException:
        result["ok"] = False
        tb = traceback.format_exc()
        result["error"] = tb
        buf.write(tb)

    result["stdout"] = buf.getvalue()
    ns["__stdout__"] = result["stdout"]

    for t in tests:
        entry = {"name": t.get("name", "check"), "passed": False, "message": ""}
        if not result["ok"]:
            entry["message"] = "Your code didn't run — fix the error above first."
            result["tests"].append(entry)
            continue
        tbuf = io.StringIO()
        try:
            local_ns = dict(ns)
            with contextlib.redirect_stdout(tbuf), contextlib.redirect_stderr(tbuf):
                exec(compile(t.get("code", ""), "<check>", "exec"), local_ns)
            entry["passed"] = True
            entry["message"] = t.get("pass_msg", "Passed")
        except AssertionError as e:
            entry["passed"] = False
            entry["message"] = str(e) or t.get("fail_msg", "Assertion failed")
        except BaseException as e:
            entry["passed"] = False
            entry["message"] = "{}: {}".format(type(e).__name__, e)
        result["tests"].append(entry)

    result["images"] = _collect_images()
    return result


def pythoneer_run_json(job_json):
    job = json.loads(job_json)
    res = pythoneer_run(job.get("code", ""), job.get("tests", []), job.get("stdin", ""))
    return json.dumps(res)
`;

let pyodide = null;
const installed = new Set(); // micropip-installed packages, cached for the worker's life

async function init() {
  pyodide = await loadPyodide({ indexURL: PYODIDE_URL });
  pyodide.runPython(KERNEL);
  const version = pyodide.runPython("import sys; sys.version.split()[0]");
  self.postMessage({ type: "ready", python: version });
}
const ready = init();

function modAvailable(name) {
  try {
    return pyodide.runPython(
      "import importlib.util as _u; _u.find_spec('" + name + "') is not None"
    );
  } catch (e) {
    return false;
  }
}

async function ensurePackages(code) {
  // Bundled packages (numpy, pandas, matplotlib, pydantic, micropip) auto-load.
  try {
    await pyodide.loadPackagesFromImports(code);
  } catch (e) {
    /* syntax errors etc. surface later when the kernel compiles the code */
  }

  // PyPI-only packages that aren't in the Pyodide distribution.
  const micro = [];
  if (/(^|\n)\s*(import\s+flask|from\s+flask\s+import)/.test(code) &&
      !installed.has("flask") && !modAvailable("flask")) {
    micro.push("flask");
  }
  if (/(^|\n)\s*(import\s+pydantic|from\s+pydantic\s+import)/.test(code) &&
      !installed.has("pydantic") && !modAvailable("pydantic")) {
    micro.push("pydantic");
  }
  if (micro.length) {
    self.postMessage({ type: "loading", packages: micro });
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    for (const pkg of micro) {
      try {
        await micropip.install(pkg);
        installed.add(pkg);
      } catch (e) {
        /* leave it: the kernel will report a clean ImportError to the learner */
      }
    }
    micropip.destroy();
  }
}

self.onmessage = async (e) => {
  const m = e.data || {};
  if (m.type !== "run") return;

  let result;
  try {
    await ready;
    await ensurePackages(m.code || "");
    pyodide.globals.set(
      "__job__",
      JSON.stringify({ code: m.code || "", tests: m.tests || [], stdin: m.stdin || "" })
    );
    const jsonStr = pyodide.runPython("pythoneer_run_json(__job__)");
    result = JSON.parse(jsonStr);
  } catch (err) {
    result = {
      stdout: "", stderr: "", ok: false,
      error: "Engine error: " + (err && err.message ? err.message : String(err)),
      tests: [], images: [],
    };
  }
  self.postMessage({ type: "result", id: m.id, result });
};
