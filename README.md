# Pythoneer 🐍

An interactive, visually-rich web course that takes you from your first
`print()` to production Python. Lessons sit side-by-side with a **live code
editor** that runs **real Python right in your browser** — no install, no server,
powered by [Pyodide](https://pyodide.org) (CPython compiled to WebAssembly).

![level](https://img.shields.io/badge/level-beginner%20%E2%86%92%20advanced-34d399)
![runs in](https://img.shields.io/badge/runs-in%20your%20browser-22d3ee)

## Features

- **Embedded editor + runner** — write code, run it, and see real output,
  friendly tracebacks, and `input()` prompts. Code executes in a Web Worker, so a
  runaway loop is stopped automatically after 12 seconds.
- **Auto-checked exercises** — each exercise is graded by real Python assertions
  and tells you exactly which checks pass or fail.
- **Step-by-step curriculum** — **12 core modules**, beginner to advanced, each
  ending in a multiple-choice **knowledge-check quiz**:
  1. First Steps · 2. Numbers, Strings & Input · 3. Decisions & Loops ·
  4. Collections · 5. Functions & Scope · 6. Object-Oriented Python ·
  7. Files & Exceptions · 8. The Standard Library · 9. Comprehensions &
  Generators · 10. Pro Toolkit · 11. Standard Library & Method Mastery ·
  12. Modern Python (dataclasses, enums, pattern matching, typing)
- **Review & retention** — every exercise and quiz question is tagged by
  **concept**, so a mistake is remembered on a dedicated **Review** page *even
  after you fix it*. Weak concepts stay flagged until you re-prove them, and the
  page recommends fresh practice exercises plus a **concept micro-test** assembled
  from questions across the whole course that target exactly what you've been
  missing.
- **Framework tracks** — pick what you care about: **Flask, Django, FastAPI,
  pandas, NumPy, Matplotlib, Requests, pytest, Streamlit**. Most run for real in
  the browser (see *How code runs*).
- **Capstone projects** — four guided, multi-step builds that combine what you've
  learned: a **To-Do List Manager**, a playable **Number Guessing Game**, an
  object-oriented **Bank Account System**, and a pandas/Matplotlib **Sales Data
  Analyzer**.
- **Inline charts** — Matplotlib figures you create render right in the output
  panel.
- **Official documentation links** — every concept lesson links straight to the
  exact page of the Python / framework docs it covers.
- **Four color palettes** — Serpent Green, Molten Amber, Arctic Cyan, Crimson
  Edge, switched from the palette popover on the **Home** page (saved per user).
- **Accounts & cloud sync** — Pythoneer is invite-only: you **log in with a name
  and password** an admin issues, and your progress, streaks, and code sync to your
  account across devices via Supabase. A single admin manages users.

## How code runs

Everything executes **in your browser** via Pyodide — there is no backend.

- **Core modules + capstone projects** use only the standard library and run
  instantly.
- **pandas, NumPy, Matplotlib** load on first use (a few MB, cached afterward) and
  compute for real; Matplotlib charts render inline.
- **Flask** runs through its built-in test client (real routing, no live server).
  **FastAPI** lessons call handlers directly while **Pydantic** validates for real.
- **Requests** runs against a built-in offline mock — the same code you'd write,
  with deterministic responses (browsers can't make raw HTTP calls).
- **Django, Streamlit, pytest** are taught conceptually (they need a full
  project / their own server / a terminal); the exercises drill the underlying
  Python logic.

## Run it locally

There's no build step. Serve the `web/` folder with any static server, e.g.:

```bash
python -m http.server 8000 --directory web
```

Then open <http://localhost:8000>. On Windows you can double-click **`run.bat`**.

> A static server (not `file://`) is required so the Web Worker and Pyodide can
> load. Pyodide itself is fetched from a CDN on first load.

## Deploy

Because it's fully static, you can host it free on **Vercel, Netlify, Cloudflare
Pages, or GitHub Pages** — just publish the `web/` directory. No server runtime
needed.

### Accounts (Supabase)

Sign-in is **required** — there is no guest mode. Set it up once by following the
steps at the top of [`web/js/auth.js`](web/js/auth.js): create a free Supabase
project, run the provided SQL (it creates `app_users` + `sessions` behind
row-level security, the access functions, and seeds the admin account), and paste
your project URL + publishable key into the `CONFIG` block.

Login is by **name + password**. The seeded **admin** account can open
**Settings → User management** (also a sidebar **Users** entry) to create and
delete accounts and view the name/password list — there is no self-signup.

## Project layout

```
Pythoneer/
├── run.bat            # Windows one-click launcher (static server)
├── pythoneer.txt      # original design / palette reference
└── web/
    ├── index.html     # app shell
    ├── css/app.css    # all styles + the four themes
    └── js/
        ├── curriculum.js     # ALL content: modules, framework tracks, projects
        ├── store.js          # local progress / streak / saved code (+ sync hooks)
        ├── theme.js          # palette switching
        ├── auth.js           # optional Supabase sign-in + cloud sync
        ├── runner.js         # drives the Pyodide worker (window.Runner)
        ├── runner.worker.js  # Pyodide engine + the Python execution kernel
        └── app.js            # router, views, the code workbench, quizzes
```

## Adding content

All content lives in `web/js/curriculum.js` — no build step, just reload.

A **lesson / exercise** is an object:

```js
{
  id: "m02-l09", kind: "exercise",      // "lesson" | "exercise" | "quiz"
  title: "Your exercise",
  docs: [{ label: "str.split()", url: "https://docs.python.org/3/library/stdtypes.html#str.split" }],
  content: `<h1>...</h1><p>HTML lesson text</p>`,
  starter: "x = 0\nprint(x)",
  stdin: "42",                          // optional: prefilled input() text
  tests: [                              // exercises only
    { name: "x is 42", code: "assert x == 42, 'x should be 42'" }
  ]
}
```

Test `code` runs *after* the learner's code in the same namespace and can read
`__stdout__` (everything the program printed). Any image the code saves (e.g. a
Matplotlib `savefig`) is shown in the output panel automatically.

A **quiz** is a lesson with `kind: "quiz"` and a `questions` array
(`{ q, options, answer, explain }`); pass ≥ 80% to mark it complete.

**Framework tracks** live in `CURRICULUM.frameworks[]` (each with a `lessons: [...]`
array) and **capstone projects** in `CURRICULUM.projects[]` (each with a
`steps: [...]` array) — both reuse the same lesson schema.

New lessons must run under Pyodide: no subprocesses, no real network calls, and
only packages available in Pyodide (or the built-in `requests` / `fastapi` shims).

## Status

The full app and all content are in place: 12 core modules (with quizzes and 30+
auto-checked exercises), 9 framework tracks, and 4 capstone projects — all running
in-browser via Pyodide, plus a Review page for revisiting missed quiz questions and
exercises. The **Django**, **Streamlit**, and **pytest** tracks are intentionally
concept-only (they need a full project, their own server, or a terminal), teaching
real code and drilling the underlying logic.
