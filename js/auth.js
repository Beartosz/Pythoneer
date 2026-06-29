/* ════════════════════════════════════════════════════════════════
   auth.js — invite-only sign-in + cloud progress sync (Supabase)

   Pythoneer is access-controlled: people log in with a Name + Password
   that an admin issues. There is no self-signup and no guest mode. A
   single admin account can create and delete users and view the
   name/password list.

   Because the app is a static site (no backend), auth runs against a
   custom `app_users` table reached ONLY through `security definer`
   Postgres functions — the tables have RLS enabled with no policies, so
   the publishable key can't touch them directly. A small session token
   (stored in localStorage) authorizes every call.

   ── SETUP (run once in the Supabase SQL editor) ───────────────────────

   create table app_users (
     id         uuid primary key default gen_random_uuid(),
     name       text unique not null,
     password   text not null,
     is_admin   boolean not null default false,
     state      jsonb not null default '{}'::jsonb,
     created_at timestamptz not null default now()
   );
   create table sessions (
     token      uuid primary key default gen_random_uuid(),
     user_id    uuid not null references app_users(id) on delete cascade,
     created_at timestamptz not null default now()
   );
   alter table app_users enable row level security;
   alter table sessions  enable row level security;
   -- No policies on purpose: the only way in is the functions below.

   create or replace function login(p_name text, p_password text)
   returns jsonb language plpgsql security definer set search_path = public as $$
   declare u app_users; t uuid;
   begin
     select * into u from app_users where name = p_name and password = p_password;
     if not found then return null; end if;
     insert into sessions(user_id) values (u.id) returning token into t;
     return jsonb_build_object('token', t, 'id', u.id, 'name', u.name,
                               'is_admin', u.is_admin, 'state', u.state);
   end; $$;

   create or replace function restore(p_token uuid)
   returns jsonb language plpgsql security definer set search_path = public as $$
   declare u app_users;
   begin
     select au.* into u from sessions s join app_users au on au.id = s.user_id
       where s.token = p_token;
     if not found then return null; end if;
     return jsonb_build_object('id', u.id, 'name', u.name,
                               'is_admin', u.is_admin, 'state', u.state);
   end; $$;

   create or replace function logout(p_token uuid)
   returns void language plpgsql security definer set search_path = public as $$
   begin delete from sessions where token = p_token; end; $$;

   create or replace function save_state(p_token uuid, p_state jsonb)
   returns void language plpgsql security definer set search_path = public as $$
   begin
     update app_users set state = p_state
       where id = (select user_id from sessions where token = p_token);
   end; $$;

   create or replace function _is_admin(p_token uuid)
   returns boolean language sql security definer set search_path = public as $$
     select coalesce((select au.is_admin from sessions s
       join app_users au on au.id = s.user_id where s.token = p_token), false);
   $$;

   create or replace function admin_list_users(p_token uuid)
   returns jsonb language plpgsql security definer set search_path = public as $$
   begin
     if not _is_admin(p_token) then raise exception 'Not authorized.'; end if;
     return coalesce((select jsonb_agg(jsonb_build_object(
       'id', id, 'name', name, 'password', password,
       'is_admin', is_admin, 'created_at', created_at,
       'last_active', state->>'lastActive') order by created_at)
       from app_users), '[]'::jsonb);
   end; $$;

   create or replace function admin_create_user(p_token uuid, p_name text, p_password text)
   returns jsonb language plpgsql security definer set search_path = public as $$
   declare nu app_users;
   begin
     if not _is_admin(p_token) then raise exception 'Not authorized.'; end if;
     if p_name is null or length(trim(p_name)) = 0 then raise exception 'A name is required.'; end if;
     if p_password is null or length(p_password) = 0 then raise exception 'A password is required.'; end if;
     if exists(select 1 from app_users where name = trim(p_name)) then
       raise exception 'That name is already taken.'; end if;
     insert into app_users(name, password, is_admin)
       values (trim(p_name), p_password, false) returning * into nu;
     return jsonb_build_object('id', nu.id, 'name', nu.name, 'password', nu.password,
                               'is_admin', nu.is_admin, 'created_at', nu.created_at);
   end; $$;

   create or replace function admin_delete_user(p_token uuid, p_target uuid)
   returns void language plpgsql security definer set search_path = public as $$
   declare caller uuid;
   begin
     if not _is_admin(p_token) then raise exception 'Not authorized.'; end if;
     select user_id into caller from sessions where token = p_token;
     if p_target = caller then raise exception 'You cannot delete yourself.'; end if;
     if (select is_admin from app_users where id = p_target) then
       raise exception 'You cannot delete an admin.'; end if;
     delete from app_users where id = p_target;
   end; $$;

   grant execute on function login(text,text)               to anon;
   grant execute on function restore(uuid)                  to anon;
   grant execute on function logout(uuid)                   to anon;
   grant execute on function save_state(uuid,jsonb)         to anon;
   grant execute on function admin_list_users(uuid)         to anon;
   grant execute on function admin_create_user(uuid,text,text) to anon;
   grant execute on function admin_delete_user(uuid,uuid)   to anon;

   ══════════════════════════════════════════════════════════════════ */
(function () {
  const CONFIG = {
    url: "https://plobskvkokzekknvugwy.supabase.co",
    // Publishable key — safe to ship in the frontend; the tables are locked
    // behind RLS-with-no-policies and only the functions above can read them.
    anonKey: "sb_publishable_3pLGpYcAmeGy_tg3veJokg_khWEhBc3",
  };

  const hasLib = typeof supabase !== "undefined" && supabase && supabase.createClient;
  const configured = !!(CONFIG.url && CONFIG.anonKey && hasLib);

  const TOKEN_KEY = "pythoneer.session";
  const PUSH_DEBOUNCE_MS = 1500;

  const client = configured ? supabase.createClient(CONFIG.url, CONFIG.anonKey) : null;
  let currentUser = null;   // { id, name, is_admin } or null
  let token = null;
  let pushTimer = null;
  const listeners = new Set();

  function notify() { listeners.forEach((fn) => { try { fn(currentUser); } catch (e) {} }); }

  function readToken() { try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; } }
  function writeToken(t) {
    token = t;
    try { t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY); } catch (e) {}
  }

  async function call(fn, args) {
    if (!client) return { error: "Sign-in isn't configured for this site." };
    try {
      const { data, error } = await client.rpc(fn, args);
      if (error) return { error: error.message || "Something went wrong." };
      return { data };
    } catch (e) {
      return { error: "Network error — check your connection." };
    }
  }

  /* ---- cloud progress sync ---- */
  async function pushNow() {
    if (!client || !token) return;
    if (pushTimer) { clearTimeout(pushTimer); pushTimer = null; }
    try { await client.rpc("save_state", { p_token: token, p_state: Store.get() }); } catch (e) {}
  }
  function schedulePush() {
    if (!client || !token) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushNow, PUSH_DEBOUNCE_MS);
  }
  function hasProgress(s) {
    return !!(s && (Object.keys(s.completed || {}).length || s.runs || Object.keys(s.code || {}).length));
  }

  // Load the signed-in user's progress into Store: merge the cloud copy over
  // the local per-user cache. On the admin's first login (empty cloud), adopt
  // the pre-account "guest" blob so existing local progress isn't lost.
  function hydrate(user, cloudState) {
    Store.useUser(user.id);
    if (cloudState && Object.keys(cloudState).length) {
      Store.merge(cloudState);
    }
    // One-time migration of pre-account ("guest") progress into the admin —
    // merge unions, so this is safe to run even once the cloud row exists.
    if (user.is_admin && hasProgress(Store.legacyState())) {
      Store.merge(Store.legacyState());
      Store.dropLegacy();
    }
    const st = Store.get();
    if (!st.name || st.name === "Learner") { st.name = user.name; Store.save(); }
    if (window.Theme) Theme.apply(st.theme);
    Store.touchStreak();
    pushNow();
  }

  /* ---- public actions ---- */
  async function login(name, password) {
    const r = await call("login", { p_name: name, p_password: password });
    if (r.error) return { error: r.error };
    if (!r.data) return { error: "Incorrect name or password." };
    const u = r.data;
    writeToken(u.token);
    currentUser = { id: u.id, name: u.name, is_admin: !!u.is_admin };
    hydrate(currentUser, u.state);
    notify();
    return { ok: true };
  }

  async function restore() {
    const t = readToken();
    if (!client || !t) return null;
    token = t;
    let data, error;
    try { ({ data, error } = await client.rpc("restore", { p_token: t })); }
    catch (e) { error = e; }
    if (error || !data) { writeToken(null); return null; }
    currentUser = { id: data.id, name: data.name, is_admin: !!data.is_admin };
    hydrate(currentUser, data.state);
    notify();
    return currentUser;
  }

  async function logout() {
    await pushNow();
    const t = token;
    writeToken(null);
    currentUser = null;
    if (t && client) { try { await client.rpc("logout", { p_token: t }); } catch (e) {} }
    Store.clearSession();
    if (window.Theme) Theme.apply(Store.get().theme);
    notify();
  }

  async function listUsers() {
    const r = await call("admin_list_users", { p_token: token });
    if (r.error) return { error: r.error };
    return { users: r.data || [] };
  }
  async function createUser(name, password) {
    const r = await call("admin_create_user", { p_token: token, p_name: name, p_password: password });
    if (r.error) return { error: r.error };
    return { user: r.data };
  }
  async function deleteUser(id) {
    const r = await call("admin_delete_user", { p_token: token, p_target: id });
    if (r.error) return { error: r.error };
    return { ok: true };
  }

  // Wire cloud push once: every Store.save() schedules a debounced upload.
  if (configured) {
    Store.onSave(() => schedulePush());
    window.addEventListener("pagehide", () => { if (token) pushNow(); });
  }

  window.Auth = {
    available: () => configured,
    user: () => currentUser,
    isAdmin: () => !!(currentUser && currentUser.is_admin),
    onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    login, logout, restore, listUsers, createUser, deleteUser,
  };
})();
