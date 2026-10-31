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

  // Seconds a session spans, taken from the session itself: the track length when known (local files),
  // else the longest pass, the captured waveform and the marks. While a pass is running with no known
  // length, the span grows just ahead of the playhead. 4 minutes is only a placeholder for an empty session.
  function duration(session, t, running) {
    let known = (session.track && session.track.duration_s) || 0;
    (session.passes || []).forEach((p) => { if (p.ended_s) known = Math.max(known, p.ended_s); });
    (session.moments || []).forEach((m) => { known = Math.max(known, m.t_end_s || m.t_s); });
    const wf = session.waveform;
    if (wf && wf.peaks && wf.peaks.length && wf.rate_hz) known = Math.max(known, wf.peaks.length / wf.rate_hz);
    if (running) return Math.max(known, (t || 0) * 1.1, 30);
    return Math.max(known, t || 0) || 240;
  }

  // A small summary of a session for the gallery's index.json: enough to draw a mini score
  // without loading every full session (waveforms are large).
  function summarize(session, path) {
    const dur = duration(session), passes = session.passes || [], moments = session.moments || [];
    const last = passes.length ? passes[passes.length - 1].n : 1;
    const r2 = (x) => Math.round(x * 100) / 100;
    const wf = session.waveform || { peaks: [], rate_hz: 50 }, bins = 160, wave = [];
    if (wf.peaks.length) {
      let max = 0; wf.peaks.forEach((p) => { if (p > max) max = p; });
      for (let i = 0; i < bins; i++) {
        const a = Math.floor((i / bins) * dur * wf.rate_hz), b = Math.max(a + 1, Math.floor(((i + 1) / bins) * dur * wf.rate_hz));
        let m = 0; for (let j = a; j < b && j < wf.peaks.length; j++) if (wf.peaks[j] > m) m = wf.peaks[j];
        wave.push(max ? r2(m / max) : 0);
      }
    }
    const lastPass = passes.find((p) => p.n === last), log = (lastPass && lastPass.energy_log) || [];
    const step = Math.max(1, Math.ceil(log.length / 100));
    const energy = log.filter((_, i) => i % step === 0 || i === log.length - 1).map((p) => [r2(p.t_s), r2(p.energy)]);
    if (lastPass && lastPass.ended_s && energy.length) energy.push([lastPass.ended_s, energy[energy.length - 1][1]]);
    const count = (key) => {
      const c = new Map();
      moments.forEach((m) => [].concat(m[key] || []).forEach((v) => { if (v) c.set(v, (c.get(v) || 0) + 1); }));
      return [...c.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k);
    };
    return {
      path, id: session.id, date: session.date, private: !!session.private,
      title: session.track ? session.track.title : "", artist: session.track ? session.track.artist : "",
      duration_s: r2(dur), passes: passes.length, marks: moments.length,
      tags: count("tags").slice(0, 6), colors: count("colors").slice(0, 10),
      sketch: session.sketches && session.sketches.length ? session.sketches[0].file : null,
      mini: {
        wave,
        // [start, end or null, colors, true when from the latest pass]
        marks: moments.map((m) => [r2(m.t_s), m.t_end_s == null ? null : r2(m.t_end_s), m.colors || [], m.pass === last]),
        energy
      }
    };
  }

  window.Journal = { pad, formatTime, parseTime, slug, today, clockTime, sessionId, newMoment, store, db, download, escape, duration, summarize };
})();
