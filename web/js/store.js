/* ════════════════════════════════════════════════════════════════
   store.js — persistent learner state in localStorage
   ════════════════════════════════════════════════════════════════ */
(function () {
  // Before sign-in, state lives under the legacy key. Once a user logs in,
  // auth.js calls Store.useUser(id) and state is namespaced per account so
  // two people on the same browser never see each other's progress.
  const LEGACY_KEY = "pythoneer.state.v1";
  let activeKey = LEGACY_KEY;

  const defaults = () => ({
    theme: "green",
    name: "Learner",
    completed: {},        // { lessonId: true }
    code: {},             // { lessonId: "saved source" }
    runs: 0,              // snippets executed
    lastActive: null,     // ISO date string (yyyy-mm-dd)
    streak: 0,
    bestStreak: 0,
  });

  function loadFrom(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  function load(key) { return Object.assign(defaults(), loadFrom(key) || {}); }

  let state = load(activeKey);
  let saveHook = null; // called after every persist, e.g. to push to the cloud

  function save() {
    try { localStorage.setItem(activeKey, JSON.stringify(state)); } catch (e) {}
    if (saveHook) { try { saveHook(state); } catch (e) {} }
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function touchStreak() {
    const t = today();
    if (state.lastActive === t) return;
    if (state.lastActive) {
      const prev = new Date(state.lastActive);
      const diff = Math.round((new Date(t) - prev) / 86400000);
      state.streak = diff === 1 ? state.streak + 1 : 1;
    } else {
      state.streak = 1;
    }
    state.lastActive = t;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    save();
  }

  const Store = {
    get: () => state,
    save,
    get theme() { return state.theme; },
    set theme(v) { state.theme = v; save(); },

    isDone: (id) => !!state.completed[id],
    markDone(id) {
      if (!state.completed[id]) { state.completed[id] = true; save(); }
    },
    unmark(id) { delete state.completed[id]; save(); },

    saveCode(id, src) { state.code[id] = src; save(); },
    getCode(id) { return state.code[id]; },

    countRun() { state.runs++; touchStreak(); save(); },
    touchStreak,

    completedCount: () => Object.keys(state.completed).length,

    reset() {
      const theme = state.theme;
      state = defaults();
      state.theme = theme;
      save();
    },

    /* ---- per-user session (used by auth.js) ---- */

    /** Switch to a logged-in user's namespaced storage and load their state. */
    useUser(userId) {
      activeKey = LEGACY_KEY + "." + userId;
      state = load(activeKey);
      return state;
    },
    /** Drop back to neutral defaults in memory on sign-out (no persist). */
    clearSession() {
      activeKey = LEGACY_KEY;
      state = defaults();
    },
    /** Pre-account ("guest") progress — for one-time migration to the admin. */
    hasLegacy: () => !!loadFrom(LEGACY_KEY),
    legacyState: () => loadFrom(LEGACY_KEY),
    dropLegacy() { try { localStorage.removeItem(LEGACY_KEY); } catch (e) {} },

    /* ---- cloud sync seam (used by auth.js) ---- */

    /** Register a callback fired after every save (debounce inside it). */
    onSave(fn) { saveHook = fn; },

    /** Merge a remote state blob into local state (called on sign-in).
        Conservative: union completions/code, keep the higher counters,
        adopt the cloud profile (name/theme). Local code wins on conflict
        so an in-progress edit is never clobbered by an older cloud copy. */
    merge(remote) {
      if (!remote || typeof remote !== "object") return;
      state.completed = Object.assign({}, remote.completed || {}, state.completed || {});
      state.code = Object.assign({}, remote.code || {}, state.code || {});
      state.runs = Math.max(state.runs || 0, remote.runs || 0);
      state.streak = Math.max(state.streak || 0, remote.streak || 0);
      state.bestStreak = Math.max(state.bestStreak || 0, remote.bestStreak || 0);
      if (remote.lastActive && (!state.lastActive || remote.lastActive > state.lastActive)) {
        state.lastActive = remote.lastActive;
      }
      if (typeof remote.name === "string" && remote.name) state.name = remote.name;
      if (typeof remote.theme === "string" && remote.theme) state.theme = remote.theme;
      save();
    },
  };

  window.Store = Store;
})();
