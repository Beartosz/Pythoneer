/* ════════════════════════════════════════════════════════════════
   app.js — router + views + the code workbench
   ════════════════════════════════════════════════════════════════ */
(function () {
  const view = document.getElementById("view");
  const C = window.CURRICULUM;

  /* ── tiny helpers ── */
  const el = (html) => { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function toast(msg) {
    const t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ── curriculum lookups ── */
  const realModules = () => C.modules;
  const allLessons = () => C.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m })));
  const authoredTracks = () => (C.frameworks || []).filter((f) => Array.isArray(f.lessons));
  const allTrackLessons = () => authoredTracks().flatMap((f) => f.lessons.map((l) => ({ ...l, track: f })));
  const allProjects = () => C.projects || [];
  const allProjectSteps = () => allProjects().flatMap((p) => p.steps.map((l) => ({ ...l, project: p })));
  function findLesson(id) {
    return allLessons().find((l) => l.id === id)
      || allTrackLessons().find((l) => l.id === id)
      || allProjectSteps().find((l) => l.id === id);
  }
  function findTrack(id) { return authoredTracks().find((f) => f.id === id); }
  function findProject(id) { return allProjects().find((p) => p.id === id); }
  function projectProgress(p) { return progressOf(p.steps); }
  function progressOf(items) {
    const total = items.length;
    const done = items.filter((l) => Store.isDone(l.id)).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  }
  function moduleProgress(m) { return progressOf(m.lessons); }
  function trackProgress(f) { return Array.isArray(f.lessons) ? progressOf(f.lessons) : { total: f.lessons || 0, done: 0, pct: 0 }; }
  // The next thing to do: first incomplete lesson/exercise in course order
  // (falling back to an unfinished quiz, then to the very first lesson).
  function nextLearningTarget() {
    const flat = C.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m })));
    return flat.find((l) => (l.kind === "lesson" || l.kind === "exercise") && !Store.isDone(l.id))
      || flat.find((l) => !Store.isDone(l.id))
      || flat[0];
  }
  function neighbors(lesson) {
    const siblings = lesson.project ? lesson.project.steps
      : lesson.track ? lesson.track.lessons : lesson.module.lessons;
    const i = siblings.findIndex((l) => l.id === lesson.id);
    const wrap = (l) => (l ? { ...l, module: lesson.module, track: lesson.track, project: lesson.project } : null);
    return { prev: wrap(i > 0 ? siblings[i - 1] : null), next: wrap(i < siblings.length - 1 ? siblings[i + 1] : null) };
  }

  /* ════════════════ VIEWS ════════════════ */

  function viewDashboard() {
    const s = Store.get();
    const totalLessons = allLessons().length;
    const done = Store.completedCount();
    const pct = Math.round((done / totalLessons) * 100);

    // pick a few "continue" cards: first non-complete real modules
    const continueMods = realModules()
      .filter((m) => m.status !== "soon")
      .slice(0, 3);

    // resume at the next unfinished lesson/exercise
    const next = nextLearningTarget();
    const allDone = done >= totalLessons;
    const ctaHref = next && !allDone ? `#/lesson/${next.id}` : "#/lessons";
    const ctaLabel = done === 0 ? "Start learning" : (allDone ? "Review the course" : "Continue learning");
    const ctaSub = next && !allDone ? `Up next: ${esc(next.module.title)} · ${esc(next.title)}` : "";

    view.innerHTML = `
      <div class="topbar">
        <div class="crumb"><b>Home</b></div>
        ${paletteMenuHtml()}
      </div>
      <section class="hero fade-in">
        <div class="glow"></div>
        <div class="greeting">Welcome back, ${esc(s.name)}</div>
        <h1>Master Python,<br>From Zero to Production</h1>
        <div class="subtitle">You're ${pct}% through the published course. Pick up where
          you left off, jump into the playground, or choose a framework track.</div>
        <div class="cta-row">
          <a class="btn primary" href="${ctaHref}"><i class="fas fa-play"></i> ${ctaLabel}</a>
          <a class="btn" href="#/playground"><i class="fas fa-terminal"></i> Open Playground</a>
        </div>
        ${ctaSub ? `<div class="cta-hint">${ctaSub}</div>` : ""}
      </section>

      <div class="stats-row fade-in">
        <div class="stat-card"><div class="stat-label">Lessons Done</div>
          <div class="stat-value">${done}</div><div class="stat-sub">of ${totalLessons} total</div></div>
        <div class="stat-card"><div class="stat-label">Code Run</div>
          <div class="stat-value">${s.runs}</div><div class="stat-sub">snippets executed</div></div>
        <div class="stat-card"><div class="stat-label">Current Streak</div>
          <div class="stat-value">${s.streak}d</div><div class="stat-sub">best: ${s.bestStreak}d</div></div>
        <div class="stat-card"><div class="stat-label">Progress</div>
          <div class="stat-value">${pct}%</div><div class="stat-sub">keep it going</div></div>
      </div>

      <div class="section-head"><h2>Continue Learning</h2>
        <span class="see-all" onclick="location.hash='#/lessons'">View all modules &rarr;</span></div>
      <div class="modules-grid fade-in">
        ${continueMods.map(moduleCard).join("")}
      </div>

      <div class="section-head"><h2>Explore Frameworks</h2>
        <span class="see-all" onclick="location.hash='#/frameworks'">All tracks &rarr;</span></div>
      <div class="modules-grid fade-in">
        ${authoredTracks().slice(0, 3).map((f) => {
          const tp = trackProgress(f);
          return `
          <div class="module-card" onclick="location.hash='#/track/${f.id}'">
            <i class="${f.icon} mod-icon"></i>
            <div class="mod-num">${f.category}</div>
            <div class="mod-title">${esc(f.name)}</div>
            <div class="mod-desc">${esc(f.desc)}</div>
            <div class="mod-foot"><span class="mod-tag">${f.level}</span>
              <span class="mod-count">${tp.total} lessons</span></div>
          </div>`;
        }).join("")}
      </div>

      <div class="section-head"><h2>Capstone Projects</h2>
        <span class="see-all" onclick="location.hash='#/projects'">All projects &rarr;</span></div>
      <div class="modules-grid fade-in">
        ${allProjects().slice(0, 3).map((p) => {
          const pp = projectProgress(p);
          return `
          <div class="module-card" onclick="location.hash='#/project/${p.id}'">
            <i class="${p.icon} mod-icon"></i>
            <div class="mod-num">${esc(p.level)}</div>
            <div class="mod-title">${esc(p.title)}</div>
            <div class="mod-desc">${esc(p.tagline)}</div>
            <div class="mod-progress"><div class="mod-progress-fill" style="width:${pp.pct}%"></div></div>
            <div class="mod-foot"><span class="mod-tag">${pp.done ? (pp.pct === 100 ? "Complete" : "In progress") : "Build it"}</span>
              <span class="mod-count">${pp.total} steps</span></div>
          </div>`;
        }).join("")}
      </div>`;

    wirePaletteMenu();
  }

  /* ════════════════ COLOR PALETTE POPOVER (Home topbar) ════════════════ */
  function paletteSwatch(colors) {
    return colors.map((c) => `<span style="background:${c}"></span>`).join("");
  }
  function paletteMenuHtml() {
    const cur = Theme.current();
    const active = Theme.PALETTES.find((p) => p.id === cur) || Theme.PALETTES[0];
    return `
      <div class="palette-menu" id="paletteMenu">
        <button class="palette-trigger" id="paletteTrigger" aria-label="Color palette" title="Color palette">
          <span class="pt-swatch">${paletteSwatch(active.swatch)}</span>
          <i class="fas fa-palette"></i>
        </button>
        <div class="palette-pop">
          <div class="pp-head">Color palette</div>
          ${Theme.PALETTES.map((p) => `
            <div class="pp-item ${cur === p.id ? "active" : ""}" data-theme="${p.id}">
              <span class="pp-swatch">${paletteSwatch(p.swatch)}</span>
              <span class="pp-name">${p.name}</span>
              <i class="fas fa-check pp-check"></i>
            </div>`).join("")}
        </div>
      </div>`;
  }
  function wirePaletteMenu() {
    const menu = document.getElementById("paletteMenu");
    if (!menu) return;
    menu.querySelector("#paletteTrigger").addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
    menu.querySelectorAll(".pp-item").forEach((item) => {
      item.addEventListener("click", () => {
        Theme.apply(item.dataset.theme);
        menu.querySelectorAll(".pp-item").forEach((i) => i.classList.toggle("active", i === item));
        const pal = Theme.PALETTES.find((p) => p.id === item.dataset.theme);
        const ts = menu.querySelector(".pt-swatch");
        if (pal && ts) ts.innerHTML = paletteSwatch(pal.swatch);
        toast(`${item.querySelector(".pp-name").textContent} applied`);
        menu.classList.remove("open");
      });
    });
  }

  function moduleCard(m) {
    const p = moduleProgress(m);
    const locked = m.status === "soon";
    let tag;
    if (locked) tag = `<span class="mod-tag locked">Roadmap</span>`;
    else if (p.pct === 100) tag = `<span class="mod-tag done">Completed</span>`;
    else if (p.done > 0) tag = `<span class="mod-tag">In progress</span>`;
    else tag = `<span class="mod-tag">Not started</span>`;
    return `
      <div class="module-card${locked ? "" : ""}" onclick="location.hash='#/lessons'">
        <i class="${m.icon} mod-icon"></i>
        <div class="mod-num">${m.num}</div>
        <div class="mod-title">${esc(m.title)}</div>
        <div class="mod-desc">${esc(m.desc)}</div>
        <div class="mod-progress"><div class="mod-progress-fill" style="width:${p.pct}%"></div></div>
        <div class="mod-foot">${tag}<span class="mod-count">${p.done}/${p.total} lessons</span></div>
      </div>`;
  }

  function viewLessons() {
    view.innerHTML = `
      <div class="topbar"><div class="crumb"><b>Lessons</b> · ${C.level}</div></div>
      <section class="hero" style="margin-bottom:24px">
        <div class="greeting">The curriculum</div>
        <h1 style="font-size:28px">From your first <code style="font-size:0.7em">print()</code> to production</h1>
        <div class="subtitle">Work through the modules in order. Each lesson includes a live
          editor — write code, run it against your real Python, and pass the checks.</div>
      </section>
      <div id="curriculum">${realModules().map(curriculumModule).join("")}</div>`;

    view.querySelectorAll(".cm-head").forEach((head) => {
      head.addEventListener("click", () => head.parentElement.classList.toggle("open"));
    });
    view.querySelectorAll(".lesson-row").forEach((row) => {
      row.addEventListener("click", () => { location.hash = "#/lesson/" + row.dataset.id; });
    });
    // open the first module with unfinished lessons
    const firstOpen = realModules().find((m) => m.status !== "soon" && moduleProgress(m).pct < 100) || realModules()[0];
    const node = view.querySelector(`[data-module="${firstOpen.id}"]`);
    if (node) node.classList.add("open");
  }

  function curriculumModule(m) {
    const p = moduleProgress(m);
    return `
      <div class="curriculum-module" data-module="${m.id}">
        <div class="cm-head">
          <div class="cm-index">${m.num.split(" ")[1] || ""}</div>
          <div class="cm-meta"><h3>${esc(m.title)}</h3><p>${esc(m.desc)}</p></div>
          <div class="cm-right">
            <div class="cm-bar"><span style="width:${p.pct}%"></span></div>
            <span class="mod-count">${p.done}/${p.total}</span>
            <i class="fas fa-chevron-right cm-chev"></i>
          </div>
        </div>
        <div class="cm-lessons">
          ${m.lessons.map((l) => {
            const dn = Store.isDone(l.id);
            const kindLabel = { exercise: "Exercise", quiz: "Quiz" }[l.kind] || "Lesson";
            const kindIcon = { exercise: "fa-flask", quiz: "fa-circle-question" }[l.kind];
            return `<div class="lesson-row ${dn ? "done" : ""}" data-id="${l.id}">
              <div class="lr-check">${dn ? '<i class="fas fa-check"></i>' : ""}</div>
              <div class="lr-title">${esc(l.title)}</div>
              <span class="lr-kind ${l.kind}">${kindIcon ? `<i class="fas ${kindIcon}"></i> ` : ""}${kindLabel}</span>
            </div>`;
          }).join("")}
        </div>
      </div>`;
  }

  function lessonCrumb(lesson) {
    if (lesson.project) {
      return `<span style="cursor:pointer" onclick="location.hash='#/projects'">Projects</span>
        &nbsp;/&nbsp; <span style="cursor:pointer" onclick="location.hash='#/project/${lesson.project.id}'">${esc(lesson.project.title)}</span>
        &nbsp;/&nbsp; <b>${esc(lesson.title)}</b>`;
    }
    if (lesson.track) {
      return `<span style="cursor:pointer" onclick="location.hash='#/frameworks'">Frameworks</span>
        &nbsp;/&nbsp; <span style="cursor:pointer" onclick="location.hash='#/track/${lesson.track.id}'">${esc(lesson.track.name)}</span>
        &nbsp;/&nbsp; <b>${esc(lesson.title)}</b>`;
    }
    return `<span style="cursor:pointer" onclick="location.hash='#/lessons'">Lessons</span>
      &nbsp;/&nbsp; ${esc(lesson.module.title)} &nbsp;/&nbsp; <b>${esc(lesson.title)}</b>`;
  }
  function backLink(lesson) {
    if (lesson.project) return { href: `#/project/${lesson.project.id}`, label: "Back to project" };
    if (lesson.track) return { href: `#/track/${lesson.track.id}`, label: "Back to track" };
    return { href: "#/lessons", label: "Back to modules" };
  }

  function docsBlock(lesson) {
    if (!lesson.docs || !lesson.docs.length) return "";
    return `<div class="docs-ref">
      <div class="docs-ref-h"><i class="fas fa-book-open"></i> Official documentation</div>
      <div class="docs-links">${lesson.docs.map((d) =>
        `<a class="docs-link" href="${d.url}" target="_blank" rel="noopener noreferrer">${esc(d.label)} <i class="fas fa-up-right-from-square"></i></a>`).join("")}</div>
    </div>`;
  }

  function viewLesson(id) {
    const lesson = findLesson(id);
    if (!lesson) { location.hash = "#/lessons"; return; }
    const { prev, next } = neighbors(lesson);

    if (lesson.kind === "quiz") return viewQuiz(lesson, prev, next);

    const back = backLink(lesson);
    view.innerHTML = `
      <div class="topbar"><div class="crumb">${lessonCrumb(lesson)}</div></div>
      <div class="lesson-view fade-in">
        <div class="lesson-content">
          ${lesson.content}
          ${docsBlock(lesson)}
          <div class="lesson-nav">
            ${prev ? `<a class="btn small" href="#/lesson/${prev.id}"><i class="fas fa-arrow-left"></i> ${esc(prev.title)}</a>` : "<span></span>"}
            ${next ? `<a class="btn small primary" href="#/lesson/${next.id}">${esc(next.title)} <i class="fas fa-arrow-right"></i></a>` : `<a class="btn small primary" href="${back.href}">${back.label}</a>`}
          </div>
        </div>
        <div id="workbench"></div>
      </div>`;

    mountWorkbench(lesson);
  }

  /* ════════════════ QUIZ (microtest) ════════════════ */
  function viewQuiz(quiz, prev, next) {
    const qs = quiz.questions || [];
    const back = backLink(quiz);
    view.innerHTML = `
      <div class="topbar"><div class="crumb">${lessonCrumb(quiz)}</div></div>
      <div class="quiz-wrap fade-in">
        <div class="quiz-head">
          <div class="lc-eyebrow"><i class="fas fa-circle-question"></i> Knowledge check</div>
          <h1>${esc(quiz.title)}</h1>
          <p class="quiz-intro">${esc(quiz.intro || "")}</p>
        </div>
        <div id="quizQuestions">
          ${qs.map((q, qi) => `
            <div class="quiz-q" data-qi="${qi}">
              <div class="quiz-q-text"><span class="quiz-q-num">${qi + 1}</span>${esc(q.q)}</div>
              <div class="quiz-options">
                ${q.options.map((opt, oi) => `
                  <label class="quiz-option" data-qi="${qi}" data-oi="${oi}">
                    <span class="quiz-radio"></span>
                    <span class="quiz-opt-text">${esc(opt)}</span>
                  </label>`).join("")}
              </div>
              <div class="quiz-explain" data-qi="${qi}"></div>
            </div>`).join("")}
        </div>
        <div class="quiz-foot">
          <button class="btn primary" id="quizSubmit"><i class="fas fa-circle-check"></i> Submit answers</button>
          <div class="quiz-score" id="quizScore"></div>
        </div>
        <div class="lesson-nav" style="margin-top:24px">
          ${prev ? `<a class="btn small" href="#/lesson/${prev.id}"><i class="fas fa-arrow-left"></i> Previous</a>` : "<span></span>"}
          ${next ? `<a class="btn small primary" href="#/lesson/${next.id}">Next <i class="fas fa-arrow-right"></i></a>` : `<a class="btn small primary" href="${back.href}">${back.label}</a>`}
        </div>
      </div>`;

    const chosen = {};   // { questionIndex: optionIndex }
    view.querySelectorAll(".quiz-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const qi = opt.dataset.qi;
        chosen[qi] = parseInt(opt.dataset.oi, 10);
        view.querySelectorAll(`.quiz-option[data-qi="${qi}"]`).forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
      });
    });

    document.getElementById("quizSubmit").addEventListener("click", () => {
      if (Object.keys(chosen).length < qs.length) {
        toast("Answer every question first"); return;
      }
      let correct = 0;
      qs.forEach((q, qi) => {
        const pick = chosen[qi];
        const ok = pick === q.answer;
        if (ok) correct++;
        view.querySelectorAll(`.quiz-option[data-qi="${qi}"]`).forEach((o) => {
          const oi = parseInt(o.dataset.oi, 10);
          o.classList.remove("selected");
          o.style.pointerEvents = "none";
          if (oi === q.answer) o.classList.add("correct");
          else if (oi === pick) o.classList.add("wrong");
        });
        const ex = view.querySelector(`.quiz-explain[data-qi="${qi}"]`);
        ex.innerHTML = `<i class="fas ${ok ? "fa-check" : "fa-xmark"}"></i> ${esc(q.explain || "")}`;
        ex.classList.add("show", ok ? "ok" : "no");
      });
      const pct = Math.round((correct / qs.length) * 100);
      const passed = pct >= 80;
      const scoreEl = document.getElementById("quizScore");
      scoreEl.className = "quiz-score " + (passed ? "pass" : "fail");
      scoreEl.innerHTML = `<i class="fas ${passed ? "fa-trophy" : "fa-rotate-left"}"></i>
        You scored ${correct}/${qs.length} (${pct}%). ${passed ? "Module check passed!" : "Score 80% to pass — review and retry."}`;
      const btn = document.getElementById("quizSubmit");
      btn.innerHTML = `<i class="fas fa-rotate-right"></i> Try again`;
      btn.onclick = () => viewQuiz(quiz, prev, next);
      Store.countRun();
      if (passed) { Store.markDone(quiz.id); toast("Quiz passed! 🎉"); }
      scoreEl.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ════════════════ WORKBENCH (editor + runner) ════════════════ */
  function mountWorkbench(lesson) {
    const isExercise = lesson.kind === "exercise" && Array.isArray(lesson.tests);
    const saved = Store.getCode(lesson.id);
    const source = saved != null ? saved : (lesson.starter || "");
    const needsInput = /(^|\n)\s*[^#\n]*\binput\s*\(/.test(lesson.starter || "");

    const host = document.getElementById("workbench");
    host.innerHTML = `
      <div class="workbench">
        <div class="wb-bar">
          <span class="wb-dot r"></span><span class="wb-dot y"></span><span class="wb-dot g"></span>
          <span class="wb-file">${lesson.id.replace(/-/g, "_")}.py</span>
          <span class="wb-actions">
            <button class="btn small" id="wbReset" title="Restore starter code"><i class="fas fa-rotate-left"></i></button>
          </span>
        </div>
        <div class="wb-editor"><textarea id="wbCode"></textarea></div>
        ${needsInput ? `
        <div class="wb-toolbar" style="border-top:none;padding-bottom:0">
          <span class="wb-hint"><i class="fas fa-keyboard"></i> Program input (one line per <code>input()</code>):</span>
        </div>
        <div class="wb-editor" style="min-height:auto">
          <textarea id="wbStdin" rows="2" style="width:100%;background:rgba(0,0,0,0.3);color:var(--text);
            border:none;border-top:1px solid var(--border);font-family:'JetBrains Mono',monospace;
            font-size:12.5px;padding:10px 14px;resize:vertical;outline:none">${esc(lessonStdin(lesson))}</textarea>
        </div>` : ""}
        <div class="wb-toolbar">
          <button class="btn primary small" id="wbRun"><i class="fas fa-play"></i> Run</button>
          ${isExercise ? `<button class="btn small" id="wbCheck"><i class="fas fa-circle-check"></i> Check</button>` : ""}
          <span class="grow"></span>
          <span class="wb-hint">Ctrl+Enter to run</span>
        </div>
        <div class="wb-output" id="wbOut">
          <div class="out-head"><span class="lbl">Output</span>
            <span class="wb-hint" id="wbStatus"></span></div>
          <div class="out-empty">Run your code to see the output here.</div>
        </div>
      </div>`;

    const cm = CodeMirror.fromTextArea(document.getElementById("wbCode"), {
      mode: "python", theme: "material-darker",
      lineNumbers: true, indentUnit: 4, tabSize: 4, indentWithTabs: false,
      lineWrapping: true, autofocus: false,
      autoCloseBrackets: true, matchBrackets: true,
    });
    cm.setValue(source);
    cm.on("change", () => Store.saveCode(lesson.id, cm.getValue()));
    setTimeout(() => cm.refresh(), 30);

    const outEl = document.getElementById("wbOut");
    const statusEl = document.getElementById("wbStatus");
    const getStdin = () => { const t = document.getElementById("wbStdin"); return t ? t.value : ""; };

    function imagesHtml(result) {
      const imgs = result.images || [];
      if (!imgs.length) return "";
      return `<div class="out-images">${imgs.map((im) =>
        `<figure class="out-fig"><img alt="${esc(im.name)}" src="data:${im.mime};base64,${im.data}">
          <figcaption>${esc(im.name)}</figcaption></figure>`).join("")}</div>`;
    }

    function renderOutput(result) {
      const blocks = [`<div class="out-head"><span class="lbl">Output</span>
        <span class="wb-hint">${result.timeout ? "⏱ stopped" : (result.ok ? "✓ finished" : "✗ error")}</span></div>`];
      const out = (result.stdout || "").replace(/\n?__PYTHONEER.*$/s, "");
      if (out.trim()) {
        blocks.push(`<div class="out-body${result.ok ? "" : " err"}">${esc(out)}</div>`);
      } else if (result.ok && !(result.images || []).length) {
        blocks.push(`<div class="out-empty">Ran with no output.</div>`);
      }
      if (!result.ok && result.error && !out.includes(result.error.trim())) {
        blocks.push(`<div class="out-body err">${esc(result.error)}</div>`);
      }
      blocks.push(imagesHtml(result));
      outEl.innerHTML = blocks.join("");
    }

    function renderChecks(result) {
      const tests = result.tests || [];
      const passed = tests.filter((t) => t.passed).length;
      const all = passed === tests.length && tests.length > 0;
      let html = `<div class="out-head"><span class="lbl">Checks</span>
        <span class="wb-hint">${passed}/${tests.length} passing</span></div>`;
      const out = (result.stdout || "").replace(/\n?__PYTHONEER.*$/s, "");
      if (out.trim()) html += `<div class="out-body${result.ok ? "" : " err"}">${esc(out)}</div>`;
      html += imagesHtml(result);
      html += `<div class="check-result">`;
      html += `<div class="check-summary ${all ? "pass" : "fail"}">
        <i class="fas ${all ? "fa-circle-check" : "fa-circle-half-stroke"}"></i>
        ${all ? "All checks passed!" : `${passed} of ${tests.length} checks passing`}</div>`;
      tests.forEach((t) => {
        html += `<div class="check-item ${t.passed ? "pass" : "fail"}">
          <i class="fas ${t.passed ? "fa-check" : "fa-xmark"} ci-icon"></i>
          <div class="ci-text"><div class="ci-name">${esc(t.name)}</div>
            ${t.passed ? "" : `<div class="ci-msg">${esc(t.message)}</div>`}</div></div>`;
      });
      if (all) {
        html += `<div class="confetti-burst"><i class="fas fa-trophy"></i>
          Nicely done — lesson marked complete.</div>`;
      }
      html += `</div>`;
      outEl.innerHTML = html;
      return all;
    }

    async function doRun() {
      statusEl.textContent = "running…";
      outEl.querySelector(".out-empty") && (outEl.querySelector(".out-empty").textContent = "Running…");
      try {
        const result = await Runner.run(cm.getValue(), getStdin());
        Store.countRun();
        renderOutput(result);
        if (lesson.kind === "lesson" && result.ok) Store.markDone(lesson.id);
      } catch (e) {
        outEl.innerHTML = engineError();
      }
      statusEl.textContent = "";
    }

    async function doCheck() {
      statusEl.textContent = "checking…";
      try {
        const result = await Runner.check(cm.getValue(), lesson.tests, getStdin());
        Store.countRun();
        const all = renderChecks(result);
        if (all) { Store.markDone(lesson.id); toast("Exercise complete! 🎉"); }
      } catch (e) {
        outEl.innerHTML = engineError();
      }
      statusEl.textContent = "";
    }

    document.getElementById("wbRun").addEventListener("click", doRun);
    const checkBtn = document.getElementById("wbCheck");
    if (checkBtn) checkBtn.addEventListener("click", doCheck);
    document.getElementById("wbReset").addEventListener("click", () => {
      cm.setValue(lesson.starter || "");
      Store.saveCode(lesson.id, lesson.starter || "");
      toast("Starter code restored");
    });
    cm.setOption("extraKeys", { "Ctrl-Enter": doRun, "Cmd-Enter": doRun });
  }

  function lessonStdin(lesson) { return lesson.stdin || ""; }
  function engineError() {
    return `<div class="out-head"><span class="lbl">Output</span><span class="wb-hint">✗ engine error</span></div>
      <div class="out-body err">The in-browser Python engine isn't ready yet.\n\nIt loads automatically the first time you open Pythoneer (a few seconds).\nCheck your internet connection and reload the page.</div>`;
  }

  /* ════════════════ PLAYGROUND ════════════════ */
  function viewPlayground() {
    const lesson = {
      id: "playground", kind: "lesson", title: "Playground",
      starter: Store.getCode("playground") || `# Your scratchpad. Write anything and Run it.
import math

for i in range(1, 6):
    print(f"{i}! = {math.factorial(i)}")
`,
    };
    view.innerHTML = `
      <div class="topbar"><div class="crumb"><b>Playground</b></div></div>
      <section class="hero" style="margin-bottom:20px">
        <div class="greeting">Free coding</div>
        <h1 style="font-size:26px">A blank canvas with real Python</h1>
        <div class="subtitle">No lesson, no checks — just you and the interpreter. The full
          standard library is available. Anything you write is saved automatically.</div>
      </section>
      <div class="lesson-view" style="grid-template-columns:1fr"><div id="workbench"></div></div>`;
    mountWorkbench(lesson);
  }

  /* ════════════════ FRAMEWORKS ════════════════ */
  function viewFrameworks() {
    const cats = [...new Set(C.frameworks.map((f) => f.category))];
    view.innerHTML = `
      <div class="topbar"><div class="crumb"><b>Frameworks</b></div></div>
      <section class="hero" style="margin-bottom:26px">
        <div class="greeting">Choose your path</div>
        <h1 style="font-size:28px">Learn the frameworks <i>you</i> care about</h1>
        <div class="subtitle">Once you're comfortable with core Python, branch into the
          ecosystem. Pick a track and we'll guide you through it, lesson by lesson.</div>
      </section>
      ${cats.map((cat) => `
        <div class="section-head"><h2>${cat}</h2></div>
        <div class="frameworks-grid" style="margin-bottom:30px">
          ${C.frameworks.filter((f) => f.category === cat).map((f) => {
            const authored = Array.isArray(f.lessons);
            const p = trackProgress(f);
            return `
            <div class="fw-card ${authored ? "ready" : "soon"}" data-fw="${f.id}">
              <div class="fw-icon"><i class="${f.icon}"></i></div>
              <h3>${f.name}</h3>
              <p>${esc(f.desc)}</p>
              <div class="fw-meta"><span class="fw-pill">${f.level}</span>
                <span class="fw-pill">${p.total} lessons</span>
                ${authored ? "" : `<span class="fw-pill soon">Roadmap</span>`}</div>
              ${authored ? `<div class="mod-progress" style="margin-top:14px"><div class="mod-progress-fill" style="width:${p.pct}%"></div></div>` : ""}
              <div class="fw-track"><button class="btn small ${authored ? "primary" : ""}">
                ${authored ? `<i class="fas fa-play"></i> ${p.done ? "Continue" : "Start track"}` : `<i class="fas fa-clock"></i> Coming soon`}</button></div>
            </div>`;
          }).join("")}
        </div>`).join("")}`;
    view.querySelectorAll(".fw-card").forEach((card) => {
      card.addEventListener("click", () => {
        const f = C.frameworks.find((x) => x.id === card.dataset.fw);
        if (Array.isArray(f.lessons)) location.hash = "#/track/" + f.id;
        else toast(`${f.name} track is on the roadmap`);
      });
    });
  }

  /* ════════════════ TRACK (a framework's lessons) ════════════════ */
  function viewTrack(id) {
    const f = findTrack(id);
    if (!f) { location.hash = "#/frameworks"; return; }
    const p = trackProgress(f);
    view.innerHTML = `
      <div class="topbar"><div class="crumb">
        <span style="cursor:pointer" onclick="location.hash='#/frameworks'">Frameworks</span>
        &nbsp;/&nbsp; <b>${esc(f.name)}</b></div></div>
      <section class="hero" style="margin-bottom:22px">
        <div class="glow"></div>
        <div class="greeting"><i class="${f.icon}"></i> ${f.category} · ${f.level}</div>
        <h1 style="font-size:30px">${esc(f.name)}</h1>
        <div class="subtitle">${esc(f.desc)}</div>
        ${f.note ? `<div class="callout" style="margin-top:16px"><i class="fas fa-circle-info"></i><div>${f.note}</div></div>` : ""}
        <div class="cta-row">
          <a class="btn primary" href="#/lesson/${f.lessons[0].id}"><i class="fas fa-play"></i> ${p.done ? "Continue track" : "Start track"}</a>
          <span class="btn" style="cursor:default">${p.done}/${p.total} done · ${p.pct}%</span>
        </div>
      </section>
      <div class="curriculum-module open" style="cursor:default">
        <div class="cm-lessons" style="display:block;padding:8px 14px 16px">
          ${f.lessons.map((l) => {
            const dn = Store.isDone(l.id);
            const kindLabel = { exercise: "Exercise", quiz: "Quiz" }[l.kind] || "Lesson";
            const kindIcon = { exercise: "fa-flask", quiz: "fa-circle-question" }[l.kind];
            return `<div class="lesson-row ${dn ? "done" : ""}" data-id="${l.id}">
              <div class="lr-check">${dn ? '<i class="fas fa-check"></i>' : ""}</div>
              <div class="lr-title">${esc(l.title)}</div>
              <span class="lr-kind ${l.kind}">${kindIcon ? `<i class="fas ${kindIcon}"></i> ` : ""}${kindLabel}</span>
            </div>`;
          }).join("")}
        </div>
      </div>`;
    view.querySelectorAll(".lesson-row").forEach((row) =>
      row.addEventListener("click", () => { location.hash = "#/lesson/" + row.dataset.id; }));
  }

  /* ════════════════ PROJECTS ════════════════ */
  function viewProjects() {
    view.innerHTML = `
      <div class="topbar"><div class="crumb"><b>Projects</b></div></div>
      <section class="hero" style="margin-bottom:26px">
        <div class="glow"></div>
        <div class="greeting">Capstone builds</div>
        <h1 style="font-size:28px">Put it all together</h1>
        <div class="subtitle">Each project is a guided, multi-step build. You'll write one
          real program across several checked steps — combining everything from the modules.</div>
      </section>
      <div class="frameworks-grid">
        ${allProjects().map((p) => {
          const pr = projectProgress(p);
          const label = pr.pct === 100 ? "Review" : (pr.done ? "Continue" : "Start project");
          return `
          <div class="fw-card ready project-card" data-proj="${p.id}">
            <div class="fw-icon"><i class="${p.icon}"></i></div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.desc)}</p>
            <div class="proj-skills">${p.skills.map((s) => `<span class="proj-skill">${esc(s)}</span>`).join("")}</div>
            <div class="fw-meta" style="margin-top:12px"><span class="fw-pill">${p.level}</span>
              <span class="fw-pill">${pr.total} steps</span></div>
            <div class="mod-progress" style="margin-top:14px"><div class="mod-progress-fill" style="width:${pr.pct}%"></div></div>
            <div class="fw-track"><button class="btn small primary"><i class="fas fa-play"></i> ${label}</button></div>
          </div>`;
        }).join("")}
      </div>`;
    view.querySelectorAll(".project-card").forEach((card) =>
      card.addEventListener("click", () => { location.hash = "#/project/" + card.dataset.proj; }));
  }

  function viewProject(id) {
    const p = findProject(id);
    if (!p) { location.hash = "#/projects"; return; }
    const pr = projectProgress(p);
    view.innerHTML = `
      <div class="topbar"><div class="crumb">
        <span style="cursor:pointer" onclick="location.hash='#/projects'">Projects</span>
        &nbsp;/&nbsp; <b>${esc(p.title)}</b></div></div>
      <section class="hero" style="margin-bottom:20px">
        <div class="glow"></div>
        <div class="greeting"><i class="${p.icon}"></i> ${esc(p.tagline)} · ${p.level}</div>
        <h1 style="font-size:30px">${esc(p.title)}</h1>
        <div class="subtitle">${p.intro}</div>
        <div class="proj-skills" style="margin-top:14px">${p.skills.map((s) => `<span class="proj-skill">${esc(s)}</span>`).join("")}</div>
        ${p.note ? `<div class="callout" style="margin-top:16px"><i class="fas fa-circle-info"></i><div>${p.note}</div></div>` : ""}
        <div class="cta-row">
          <a class="btn primary" href="#/lesson/${p.steps[0].id}"><i class="fas fa-play"></i> ${pr.done ? "Continue project" : "Start project"}</a>
          <span class="btn" style="cursor:default">${pr.done}/${pr.total} steps · ${pr.pct}%</span>
        </div>
      </section>
      <div class="curriculum-module open" style="cursor:default">
        <div class="cm-lessons" style="display:block;padding:8px 14px 16px">
          ${p.steps.map((l, i) => {
            const dn = Store.isDone(l.id);
            const isStep = l.kind !== "lesson" || /step/i.test(l.title) || true;
            return `<div class="lesson-row ${dn ? "done" : ""}" data-id="${l.id}">
              <div class="lr-check">${dn ? '<i class="fas fa-check"></i>' : `<span class="step-num">${i + 1}</span>`}</div>
              <div class="lr-title">${esc(l.title)}</div>
              <span class="lr-kind ${l.kind}">${l.kind === "exercise" ? "Step" : "Read"}</span>
            </div>`;
          }).join("")}
        </div>
      </div>`;
    view.querySelectorAll(".lesson-row").forEach((row) =>
      row.addEventListener("click", () => { location.hash = "#/lesson/" + row.dataset.id; }));
  }

  /* ════════════════ SETTINGS ════════════════ */
  function viewSettings() {
    const s = Store.get();
    const user = window.Auth ? Auth.user() : null;
    view.innerHTML = `
      <div class="topbar"><div class="crumb"><b>Settings</b></div></div>

      <div class="settings-section fade-in">
        <h2>Your profile</h2>
        <div class="desc">A name to greet you by on the dashboard.</div>
        <div class="setting-row">
          <div class="sr-text"><h4>Display name</h4><p>Shown in your greeting.</p></div>
          <input id="nameInput" value="${esc(s.name)}" style="background:var(--frame);border:1px solid var(--border);
            color:var(--heading);border-radius:9px;padding:9px 13px;font-family:inherit;font-size:14px;outline:none">
        </div>
      </div>

      <div class="settings-section fade-in">
        <h2>Python runtime</h2>
        <div class="desc">Your code runs entirely in your browser — no install, no server.</div>
        <div class="setting-row">
          <div class="sr-text"><h4>Engine status</h4><p id="engineLine">Loading…</p></div>
          <button class="btn small" id="engineCheck"><i class="fas fa-rotate"></i> Re-check</button>
        </div>
      </div>

      <div class="settings-section fade-in">
        <h2>Account</h2>
        <div class="desc">You're signed in${user ? ` as <b style="color:var(--heading)">${esc(user.name)}</b>` : ""}. Your progress syncs to your account automatically — log out from the sidebar.</div>
      </div>

      <div class="settings-section fade-in">
        <h2>Progress</h2>
        <div class="desc">Your lessons, code, and streak for this account.</div>
        <div class="setting-row">
          <div class="sr-text"><h4>Reset all progress</h4><p>Clears completed lessons, saved code, and streak. Keeps your palette.</p></div>
          <button class="btn small" id="resetBtn" style="border-color:rgba(244,63,94,0.4);color:#fb7185">
            <i class="fas fa-trash"></i> Reset</button>
        </div>
      </div>`;

    const nameInput = document.getElementById("nameInput");
    nameInput.addEventListener("input", () => { const st = Store.get(); st.name = nameInput.value || "Learner"; Store.save(); });

    document.getElementById("resetBtn").addEventListener("click", () => {
      if (confirm("Reset all progress? This cannot be undone.")) {
        Store.reset(); toast("Progress reset"); render();
      }
    });

    const engineLine = document.getElementById("engineLine");
    const checkEngine = () => {
      if (Runner.isReady && Runner.isReady()) {
        Runner.health().then((h) => {
          engineLine.textContent = h ? `Ready — Python ${h.python}, in your browser` : "Loading…";
        });
      } else {
        engineLine.textContent = "Loading the Python engine…";
        Runner.whenReady()
          .then((py) => { engineLine.textContent = `Ready — Python ${py}, in your browser`; })
          .catch(() => { engineLine.textContent = "Failed to load — check your connection and reload."; });
      }
    };
    document.getElementById("engineCheck").addEventListener("click", checkEngine);
    checkEngine();
  }

  /* ════════════════ LOGIN (required — no guest mode) ════════════════ */
  function viewLogin() {
    const ready = !window.Auth || Auth.available();
    view.innerHTML = `
      <div class="login-screen fade-in">
        <div class="login-card">
          <div class="login-brand"><span class="icon-box"><i class="fab fa-python"></i></span> Pythoneer</div>
          <div class="login-sub">Sign in to start learning Python.</div>
          ${ready ? `
          <form id="loginForm" autocomplete="on">
            <div class="login-field">
              <label for="loginName">Name</label>
              <input class="login-input" id="loginName" type="text" autocomplete="username" autofocus>
            </div>
            <div class="login-field">
              <label for="loginPass">Password</label>
              <input class="login-input" id="loginPass" type="password" autocomplete="current-password">
            </div>
            <button class="btn primary login-btn" id="loginBtn" type="submit"><i class="fas fa-arrow-right-to-bracket"></i> Log in</button>
            <div class="login-error" id="loginError"></div>
          </form>` : `
          <div class="login-error">Sign-in isn't configured for this site.</div>`}
        </div>
      </div>`;
    if (!ready) return;

    const form = document.getElementById("loginForm");
    const errEl = document.getElementById("loginError");
    const btn = document.getElementById("loginBtn");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("loginName").value.trim();
      const pass = document.getElementById("loginPass").value;
      if (!name || !pass) { errEl.textContent = "Enter your name and password."; return; }
      errEl.textContent = "";
      btn.disabled = true;
      btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Logging in…`;
      const r = await Auth.login(name, pass);
      if (r.error) {
        errEl.textContent = r.error;
        btn.disabled = false;
        btn.innerHTML = `<i class="fas fa-arrow-right-to-bracket"></i> Log in`;
        return;
      }
      // success → Auth.onChange triggers render() into the app
    });
  }

  /* ════════════════ USER MANAGEMENT (admin only) ════════════════ */
  function viewUsers() {
    if (!window.Auth || !Auth.isAdmin()) { location.hash = "#/"; return; }
    view.innerHTML = `
      <div class="topbar"><div class="crumb">
        <span style="cursor:pointer" onclick="location.hash='#/settings'">Settings</span>
        &nbsp;/&nbsp; <b>User management</b></div></div>
      <section class="hero" style="margin-bottom:24px">
        <div class="greeting"><i class="fas fa-users-gear"></i> Administration</div>
        <h1 style="font-size:26px">Users</h1>
        <div class="subtitle">Create accounts and review who can sign in. Each person logs in
          with the name and password you set here.</div>
      </section>

      <div class="settings-section">
        <h2>Add a user</h2>
        <div class="desc">Pick a unique name and a password, then share them with the learner.</div>
        <div class="users-create">
          <div class="uc-field"><label for="newName">Name</label><input id="newName" type="text" placeholder="e.g. Alex"></div>
          <div class="uc-field"><label for="newPass">Password</label><input id="newPass" type="text" placeholder="Password"></div>
          <button class="btn primary" id="addUserBtn"><i class="fas fa-plus"></i> Add user</button>
        </div>
        <p class="login-error" id="usersMsg" style="margin:0"></p>
      </div>

      <div class="settings-section">
        <h2>All users</h2>
        <div class="desc">Passwords are shown so you can share them. Keep this screen private.</div>
        <div class="users-card"><table class="users-table" id="usersTable">
          <thead><tr><th>Name</th><th>Password</th><th>Created</th><th>Last active</th><th></th></tr></thead>
          <tbody><tr><td colspan="5" style="color:var(--muted)">Loading…</td></tr></tbody>
        </table></div>
      </div>`;

    const msg = (t, ok) => {
      const m = document.getElementById("usersMsg");
      if (m) { m.textContent = t; m.style.color = ok ? "var(--accent)" : "#fb7185"; }
    };

    async function refresh() {
      const tbody = document.querySelector("#usersTable tbody");
      const r = await Auth.listUsers();
      if (r.error) { tbody.innerHTML = `<tr><td colspan="5" style="color:#fb7185">${esc(r.error)}</td></tr>`; return; }
      const users = r.users || [];
      tbody.innerHTML = users.map((u) => {
        const created = (u.created_at || "").slice(0, 10);
        return `<tr data-id="${u.id}">
          <td><span class="u-name">${esc(u.name)}</span>${u.is_admin ? `<span class="u-badge">Admin</span>` : ""}</td>
          <td><span class="u-pass">${esc(u.password)}</span></td>
          <td style="color:var(--muted)">${esc(created)}</td>
          <td style="color:var(--muted)">${u.last_active ? esc(u.last_active) : "Never"}</td>
          <td style="text-align:right">${u.is_admin ? "" :
            `<button class="btn small u-del" data-del="${u.id}" data-name="${esc(u.name)}"><i class="fas fa-trash"></i> Delete</button>`}</td>
        </tr>`;
      }).join("");
      tbody.querySelectorAll("[data-del]").forEach((b) => {
        b.addEventListener("click", async () => {
          if (!confirm(`Delete user "${b.dataset.name}" and all their progress?`)) return;
          const d = await Auth.deleteUser(b.dataset.del);
          if (d.error) return msg(d.error, false);
          msg(`Deleted ${b.dataset.name}.`, true);
          refresh();
        });
      });
    }

    document.getElementById("addUserBtn").addEventListener("click", async () => {
      const name = document.getElementById("newName").value.trim();
      const pass = document.getElementById("newPass").value;
      if (!name || !pass) return msg("Enter a name and a password.", false);
      const r = await Auth.createUser(name, pass);
      if (r.error) return msg(r.error, false);
      document.getElementById("newName").value = "";
      document.getElementById("newPass").value = "";
      msg(`Created ${name}.`, true);
      refresh();
    });

    refresh();
  }

  /* ════════════════ ROUTER ════════════════ */
  function render() {
    const hash = location.hash || "#/";

    // Require sign-in: nothing is reachable until a user logs in. Hide the
    // shell in JS too, so a logged-out visitor never sees the nav even if a
    // stale cached stylesheet is missing the `logged-out` rules.
    if (window.Auth && !Auth.user()) {
      document.body.classList.add("logged-out");
      setShell(false);
      return viewLogin();
    }
    document.body.classList.remove("logged-out");
    setShell(true);

    let navHash = hash;
    if (hash.startsWith("#/track/")) navHash = "#/frameworks";
    else if (hash.startsWith("#/project/")) navHash = "#/projects";
    document.querySelectorAll(".nav-item").forEach((n) => {
      const r = n.getAttribute("data-route");
      n.classList.toggle("active", navHash === r || (r !== "#/" && navHash.startsWith(r)));
    });
    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo(0, 0);

    if (hash.startsWith("#/lesson/")) return viewLesson(hash.slice("#/lesson/".length));
    if (hash.startsWith("#/track/")) return viewTrack(hash.slice("#/track/".length));
    if (hash.startsWith("#/project/")) return viewProject(hash.slice("#/project/".length));
    switch (hash) {
      case "#/lessons": return viewLessons();
      case "#/playground": return viewPlayground();
      case "#/frameworks": return viewFrameworks();
      case "#/projects": return viewProjects();
      case "#/users": return viewUsers();
      case "#/settings": return viewSettings();
      default: return viewDashboard();
    }
  }

  window.addEventListener("hashchange", render);

  // Show/hide the whole app shell (sidebar + mobile menu button).
  function setShell(visible) {
    const sb = document.getElementById("sidebar");
    const mt = document.getElementById("menuToggle");
    if (sb) sb.style.display = visible ? "" : "none";
    if (mt) mt.style.display = visible ? "" : "none";
  }

  // Sidebar chrome that depends on who's signed in (admin nav, account block).
  function updateChrome() {
    const u = window.Auth ? Auth.user() : null;
    const navUsers = document.getElementById("navUsers");
    if (navUsers) navUsers.style.display = u && Auth.isAdmin() ? "" : "none";
    const acct = document.getElementById("sidebarAccount");
    if (acct) {
      acct.style.display = u ? "" : "none";
      if (u) {
        const av = document.getElementById("saAvatar");
        const nm = document.getElementById("saName");
        if (av) av.textContent = (u.name || "?")[0].toUpperCase();
        if (nm) nm.textContent = u.name || "";
      }
    }
  }

  /* ════════════════ CONFIRMATION MODAL ════════════════ */
  function showConfirm({ title, body, confirmLabel = "Confirm", cancelLabel = "Cancel",
                        icon = "fa-circle-question", danger = false } = {}) {
    return new Promise((resolve) => {
      const overlay = el(`
        <div class="modal-overlay">
          <div class="modal-card" role="dialog" aria-modal="true">
            <div class="modal-icon ${danger ? "danger" : ""}"><i class="fas ${icon}"></i></div>
            <h3 class="modal-title">${esc(title || "Are you sure?")}</h3>
            ${body ? `<p class="modal-body">${esc(body)}</p>` : ""}
            <div class="modal-actions">
              <button class="btn" data-act="cancel">${esc(cancelLabel)}</button>
              <button class="btn ${danger ? "danger" : "primary"}" data-act="ok">${esc(confirmLabel)}</button>
            </div>
          </div>
        </div>`);
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add("show"));
      const done = (val) => {
        overlay.classList.remove("show");
        setTimeout(() => overlay.remove(), 200);
        document.removeEventListener("keydown", onKey);
        resolve(val);
      };
      overlay.querySelector('[data-act="cancel"]').addEventListener("click", () => done(false));
      overlay.querySelector('[data-act="ok"]').addEventListener("click", () => done(true));
      overlay.addEventListener("mousedown", (e) => { if (e.target === overlay) done(false); });
      const onKey = (e) => {
        if (e.key === "Escape") done(false);
        else if (e.key === "Enter") done(true);
      };
      document.addEventListener("keydown", onKey);
      setTimeout(() => { const ok = overlay.querySelector('[data-act="ok"]'); if (ok) ok.focus(); }, 50);
    });
  }

  async function doLogout() {
    const ok = await showConfirm({
      title: "Log out?",
      body: "You'll need your name and password to sign back in.",
      confirmLabel: "Log out",
      icon: "fa-arrow-right-from-bracket",
      danger: true,
    });
    if (!ok) return;
    await Auth.logout();
    toast("Logged out");
    // Auth.onChange → render() returns to the login screen
  }

  /* ════════════════ BOOT ════════════════ */
  async function boot() {
    // python runtime status in sidebar (independent of auth)
    const dot = document.getElementById("serverDot");
    const label = document.getElementById("serverStatus");
    label.textContent = "Loading Python…";
    Runner.whenReady()
      .then((py) => { dot.classList.add("online"); label.textContent = `Python ${py} · in your browser`; })
      .catch(() => { label.textContent = "Python engine failed to load"; });

    // re-render on sign in/out so the gate, dashboard and sidebar stay in sync
    if (window.Auth) Auth.onChange(() => { updateChrome(); render(); });

    document.getElementById("menuToggle").addEventListener("click", () =>
      document.getElementById("sidebar").classList.toggle("open"));

    const logoutNav = document.getElementById("logoutNav");
    if (logoutNav) logoutNav.addEventListener("click", doLogout);

    // close the palette popover on any outside click
    document.addEventListener("click", (e) => {
      const m = document.getElementById("paletteMenu");
      if (m && !m.contains(e.target)) m.classList.remove("open");
    });

    // resume a saved session before the first render decides login vs. app
    if (window.Auth) { try { await Auth.restore(); } catch (e) {} }
    updateChrome();
    render();
    document.getElementById("boot").style.display = "none";
  }

  boot();
})();
