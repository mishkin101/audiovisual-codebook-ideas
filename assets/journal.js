// Shared helpers for the listening journal (plain script, exposes window.Journal).
(function () {
  function pad(n) { return String(n).padStart(2, "0"); }

  function formatTime(seconds) {
    if (seconds == null) return "";
    const s = Math.max(0, seconds);
    const m = Math.floor(s / 60);
    return pad(m) + ":" + pad(Math.floor(s % 60)) + "." + Math.floor((s % 1) * 10);
  }

  function slug(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
  }

  function today() {
    const d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function clockTime(ms) {
    const d = new Date(ms);
    return pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  function sessionId(date, track) {
    return [date, slug(track.artist), slug(track.title)].filter(Boolean).join("-");
  }

  // A blank moment with every detail field present, so the editor can fill them in later.
  function newMoment(fields) {
    return Object.assign({
      n: 0, pass: 1, kind: "tap", t_s: 0, t_end_s: null, energy: null,
      tags: [], colors: [], motion: "", texture: "", other: "", note: "", sketch: null
    }, fields);
  }

  // Storage can be unavailable (private windows, blocked site data), so never let it throw.
  const store = {
    get(key) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
      catch (e) { return null; }
    },
    set(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); return true; }
      catch (e) { return false; }
    },
    remove(key) { try { localStorage.removeItem(key); } catch (e) {} }
  };

  function download(filename, data, type) {
    const blob = data instanceof Blob ? data : new Blob([data], { type: type || "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  // "1:12.4", "01:12.4" or "72.4" -> seconds. Returns null when it can't be read.
  function parseTime(text) {
    const t = String(text || "").trim();
    if (!t) return null;
    const parts = t.split(":");
    const sec = parseFloat(parts.pop());
    const min = parts.length ? parseInt(parts.pop(), 10) : 0;
    if (isNaN(sec) || isNaN(min)) return null;
    return Math.max(0, min * 60 + sec);
  }

  function escape(text) {
    return String(text == null ? "" : text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  // IndexedDB key-value store for things too big or too rich for localStorage
  // (sketch images, the chosen repo folder). Every call fails quietly.
  const db = (function () {
    let opening = null;
    function open() {
      if (!opening) opening = new Promise((resolve, reject) => {
        const req = indexedDB.open("listening-journal", 1);
        req.onupgradeneeded = () => req.result.createObjectStore("kv");
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
      return opening;
    }
    async function run(mode, fn) {
      try {
        const conn = await open();
        return await new Promise((resolve, reject) => {
          const tx = conn.transaction("kv", mode), req = fn(tx.objectStore("kv"));
          tx.oncomplete = () => resolve(req ? req.result : undefined);
          tx.onerror = () => reject(tx.error);
        });
      } catch (e) { return undefined; }
    }
    return {
      get: (k) => run("readonly", (st) => st.get(k)),
      set: (k, v) => run("readwrite", (st) => st.put(v, k)),
      remove: (k) => run("readwrite", (st) => st.delete(k))
    };
  })();

  window.Journal = { pad, formatTime, parseTime, slug, today, clockTime, sessionId, newMoment, store, db, download, escape };
})();
