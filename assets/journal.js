// Shared helpers for the listening journal (plain script, exposes window.Journal).
(function () {
  function pad(n) { return String(n).padStart(2, "0"); }

  function formatTime(seconds) {
    if (seconds == null) return "";
    const s = Math.max(0, seconds);
    const m = Math.floor(s / 60);
    return m + ":" + pad(Math.floor(s % 60)) + "." + Math.floor((s % 1) * 10);
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
      n: 0, pass: 1, t_s: 0, t_end_s: null, energy: null,
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

  function download(filename, text) {
    const blob = new Blob([text], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  window.Journal = { formatTime, slug, today, clockTime, sessionId, newMoment, store, download };
})();
