/* ════════════════════════════════════════════════════════════════
   runner.js — drives the Pyodide worker that runs learner code

   Keeps the exact window.Runner API the app already uses:
     Runner.run(code, stdin)         -> Promise<result>
     Runner.check(code, tests, stdin)-> Promise<result>
     Runner.health()                 -> Promise<{ok, python} | null>
   plus Runner.whenReady() for the boot/settings status UI.

   The heavy lifting (Pyodide/CPython) lives in runner.worker.js. We
   keep one warm worker and enforce a hard 12s timeout by terminating
   a runaway worker and spawning a fresh one — the only timeout
   strategy that works on plain static hosting (no COOP/COEP needed).
   ════════════════════════════════════════════════════════════════ */
(function () {
  const TIMEOUT_MS = 12000;
  const WORKER_URL = "js/runner.worker.js";

  let worker = null;
  let readyPromise = null;
  let isReady = false;
  let pyVersion = null;
  let loadingPackages = null; // e.g. ["flask"] while micropip installs
  let seq = 0;
  const pending = new Map(); // id -> { resolve, timer }

  function spawn() {
    isReady = false;
    worker = new Worker(WORKER_URL);
    readyPromise = new Promise((resolve, reject) => {
      worker.addEventListener("message", function onMsg(e) {
        const m = e.data || {};
        if (m.type === "ready") {
          isReady = true;
          pyVersion = m.python;
          loadingPackages = null;
          resolve(m.python);
        }
      });
      worker.addEventListener("error", (err) => reject(err));
    });

    worker.addEventListener("message", (e) => {
      const m = e.data || {};
      if (m.type === "result") {
        const p = pending.get(m.id);
        if (p) {
          clearTimeout(p.timer);
          pending.delete(m.id);
          p.resolve(m.result);
        }
      } else if (m.type === "loading") {
        loadingPackages = m.packages || null;
      }
    });
  }
  spawn();

  function restart() {
    try { worker.terminate(); } catch (e) { /* already gone */ }
    pending.clear(); // their resolves were already settled by the timeout path
    spawn();
  }

  function exec(code, tests, stdin) {
    const id = ++seq;
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        restart(); // kill the runaway interpreter, bring up a fresh one
        resolve({
          stdout: "", stderr: "", ok: false, timeout: true,
          error: "Your code took too long (over 12s) and was stopped. " +
                 "Look for an infinite loop.",
          tests: [], images: [],
        });
      }, TIMEOUT_MS);

      pending.set(id, { resolve, timer });

      readyPromise.then(() => {
        if (pending.has(id)) {
          worker.postMessage({ type: "run", id, code, tests: tests || [], stdin: stdin || "" });
        }
      }).catch(() => {
        const p = pending.get(id);
        if (p) { clearTimeout(p.timer); pending.delete(id); }
        resolve({
          stdout: "", stderr: "", ok: false,
          error: "The Python engine failed to load. Check your connection and reload the page.",
          tests: [], images: [],
        });
      });
    });
  }

  const Runner = {
    run(code, stdin = "") { return exec(code, [], stdin); },
    check(code, tests, stdin = "") { return exec(code, tests, stdin); },

    /** Resolves with the Python version once the engine is ready. */
    whenReady() { return readyPromise; },

    isReady() { return isReady; },
    loadingPackages() { return loadingPackages; },

    /** Back-compat: {ok, python} when ready, null while still loading. */
    async health() {
      return isReady ? { ok: true, python: pyVersion } : null;
    },
  };

  window.Runner = Runner;
})();
