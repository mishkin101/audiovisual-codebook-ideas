// The score: waveform, ruler, marks and energy drawn on one time axis.
// Shared by the Marker, the editor and (later) the gallery. Exposes window.Score.
(function () {
  const RULER = 24, MARKS = 80, SWATCH = 6, MIN_SPAN = 4;
  const STEPS = [0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];

  function tokens() {
    const css = getComputedStyle(document.documentElement), C = {};
    ["void", "slab", "rule", "dim", "mid", "bright", "live"].forEach((k) => C[k] = css.getPropertyValue("--" + k).trim());
    C.font = css.getPropertyValue("--mono").trim();
    return C;
  }

  // Seconds the score spans: the track length when known, else whatever has been marked, at least 4 minutes.
  function duration(session, t) {
    let maxT = t || 0;
    session.passes.forEach((p) => { if (p.ended_s) maxT = Math.max(maxT, p.ended_s); });
    session.moments.forEach((m) => { maxT = Math.max(maxT, m.t_end_s || m.t_s); });
    if (session.track.duration_s) return Math.max(session.track.duration_s, maxT);
    return Math.max(240, maxT * 1.05);
  }

  function create(canvas) {
    const g = canvas.getContext("2d"), C = tokens();
    let W = 0, H = 0, hatch = null;
    const L = { dur: 240, start: 0, span: 240, waveH: 0, rulerY: 0, marksY: 0, energyY: 0, moments: [] };
    const view = { start: 0, span: null };   // span null = whole track fits the width

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const p = document.createElement("canvas"); p.width = p.height = 6;
      const pg = p.getContext("2d"); pg.strokeStyle = C.mid; pg.lineWidth = 1;
      pg.beginPath(); pg.moveTo(0, 6); pg.lineTo(6, 0); pg.stroke();
      hatch = g.createPattern(p, "repeat");
    }

    const px = (x) => Math.round(x) + 0.5;
    function vline(x, y0, y1, color, w = 1) {
      const xx = w === 1 ? px(x) : Math.round(x);
      g.strokeStyle = color; g.lineWidth = w;
      g.beginPath(); g.moveTo(xx, y0); g.lineTo(xx, y1); g.stroke();
    }
    function hline(y, color) { g.strokeStyle = color; g.lineWidth = 1; g.beginPath(); g.moveTo(0, px(y)); g.lineTo(W, px(y)); g.stroke(); }
    function label(text, x, y, color = C.mid) {
      g.fillStyle = color; g.textAlign = "left"; g.textBaseline = "top";
      g.font = "500 10px " + C.font;
      if ("letterSpacing" in g) g.letterSpacing = "1.6px";
      g.fillText(String(text).toUpperCase(), x, y);
    }

    // st: { session, t, current (pass n), running, hold: {t} | null, selected (moment n), energyNow, playhead, colors, follow }
    function draw(st) {
      const s = st.session, t = st.t || 0, current = st.current || 0;
      const dur = L.dur = duration(s, t);
      const span = L.span = view.span ? Math.min(view.span, dur) : dur;
      if (st.follow && view.span && (t < view.start || t > view.start + span * 0.85)) view.start = t - span * 0.15;
      const start = L.start = view.start = Math.max(0, Math.min(view.start, dur - span));
      const X = (sec) => ((sec - start) / span) * W;
      const waveH = L.waveH = Math.round(H * 0.42), rulerY = L.rulerY = waveH;
      const marksY = L.marksY = waveH + RULER, energyY = L.energyY = marksY + MARKS, mBot = energyY;
      g.fillStyle = C.void; g.fillRect(0, 0, W, H);

      // waveform
      g.fillStyle = C.slab; g.fillRect(0, 0, W, waveH);
      const wf = s.waveform || { peaks: [], rate_hz: 20 }, peaks = wf.peaks, rate = wf.rate_hz || 20, mid = waveH / 2;
      if (peaks.length) {
        let max = 0; for (const p of peaks) if (p > max) max = p;
        const norm = max > 0 ? 1 / max : 0, amp = mid - 16;
        for (let x = 0; x < W; x++) {
          const a = Math.floor((start + (x / W) * span) * rate), b = Math.max(a + 1, Math.floor((start + ((x + 1) / W) * span) * rate));
          let m = 0; for (let i = a; i < b && i < peaks.length; i++) if (peaks[i] > m) m = peaks[i];
          if (!m) continue;
          const h = Math.max(0.5, m * norm * amp);
          vline(x, mid - h, mid + h, st.playhead && x < X(t) ? C.bright : C.mid);
        }
      } else {
        hline(mid, C.rule);
      }
      label("Waveform" + (wf.source ? " · " + wf.source : ""), 16, 12);

      // ruler: tick spacing follows the zoom
      hline(rulerY, C.rule);
      const pxPerSec = W / span;
      const minor = STEPS.find((v) => v * pxPerSec >= 12) || 600;
      const major = STEPS.find((v) => v >= minor && v * pxPerSec >= 90 && Math.abs(v / minor - Math.round(v / minor)) < 1e-6) || minor * 6;
      for (let sec = Math.ceil(start / minor) * minor; sec <= start + span; sec = Math.round((sec + minor) * 100) / 100) {
        const isMajor = Math.abs(sec / major - Math.round(sec / major)) < 1e-6;
        vline(X(sec), rulerY, rulerY + (isMajor ? 10 : 5), C.dim);
        if (isMajor && X(sec) < W - (span < dur - 0.01 ? 110 : 48)) label(clock(sec, major < 1), X(sec) + 4, rulerY + 12, C.dim);
      }
      // zoomed: a thin overview at the top shows which part of the track is in view
      if (span < dur - 0.01) {
        g.fillStyle = C.rule; g.fillRect(0, 0, W, 2);
        g.fillStyle = C.live; g.fillRect((start / dur) * W, 0, Math.max(2, (span / dur) * W), 2);
        g.font = "500 10px " + C.font; g.textAlign = "right"; g.textBaseline = "top"; g.fillStyle = C.mid;
        g.fillText("×" + (dur / span).toFixed(1), W - 12, rulerY + 12);
      }

      // marks: current pass full height, earlier passes half height in dim
      hline(marksY, C.rule);
      label("Marks", 16, marksY + 8);
      L.moments = [];
      s.moments.forEach((m) => {
        const own = m.pass === current, y0 = own ? marksY : marksY + MARKS / 2, col = own ? C.live : C.dim;
        const x0 = X(m.t_s), x1 = m.kind === "range" && m.t_end_s != null ? X(m.t_end_s) : x0;
        L.moments.push({ n: m.n, x0, x1 });
        if (m.kind === "range") {
          if (own) { g.fillStyle = hatch; g.fillRect(x0, y0, Math.max(1, x1 - x0), mBot - y0); }
          vline(x0, y0, mBot, col); vline(x1, y0, mBot, own ? C.bright : C.dim);
        } else {
          vline(x0, y0, mBot, col);
        }
        // your colors: the only color the score ever shows
        if (st.colors && m.colors && m.colors.length) {
          const y = mBot - SWATCH - 1;
          if (m.kind === "range") {
            const w = Math.max(1, x1 - x0) / m.colors.length;
            m.colors.forEach((c, i) => { g.fillStyle = c; g.fillRect(x0 + i * w, y, w, SWATCH); });
          } else {
            m.colors.forEach((c, i) => { g.fillStyle = c; g.fillRect(Math.round(x0) + 2 + i * (SWATCH + 1), y, SWATCH, SWATCH); });
          }
        }
        if (own) {
          const ly = y0 + 4, text = String(m.n).padStart(2, "0");
          if (m.n === st.selected) {
            g.fillStyle = C.live; g.fillRect(Math.round(x0) + 3, ly - 3, 22, 16);
            label(text, x0 + 6, ly, C.void);
          } else label(text, x0 + 6, ly);
        }
      });
      if (st.hold) {
        g.fillStyle = hatch; g.fillRect(X(st.hold.t), marksY, X(t) - X(st.hold.t), MARKS);
        vline(X(st.hold.t), marksY, mBot, C.live);
      }

      // energy: continuous line per pass, current pass filled
      hline(energyY, C.rule);
      label("Energy", 16, energyY + 8);
      const eTop = energyY + 28, eBot = H - 8, eY = (e) => eBot - e * (eBot - eTop);
      s.passes.forEach((p) => {
        const log = p.energy_log || []; if (!log.length) return;
        const own = p.n === current, end = own && st.running ? t : p.ended_s || log[log.length - 1].t_s;
        const pts = log.map((pt) => [X(pt.t_s), eY(pt.energy)]);
        pts.push([X(Math.max(end, log[log.length - 1].t_s)), eY(log[log.length - 1].energy)]);
        if (own) {
          g.fillStyle = C.slab; g.beginPath(); g.moveTo(pts[0][0], eBot);
          pts.forEach(([x, y]) => g.lineTo(x, y)); g.lineTo(pts[pts.length - 1][0], eBot); g.closePath(); g.fill();
        }
        g.strokeStyle = own ? C.bright : C.dim; g.lineWidth = 1; g.beginPath();
        pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke();
      });
      if (st.energyNow != null) {
        const tickX = st.playhead ? X(t) : 0;
        g.fillStyle = C.live; g.fillRect(Math.round(tickX) - 8, Math.round(eY(st.energyNow)), 16, 1);
      }

      if (st.playhead) vline(X(t), 0, H, C.live, 2);
    }

    function clock(sec, tenths) {
      const m = Math.floor(sec / 60), r = sec % 60;
      return String(m).padStart(2, "0") + ":" + (tenths ? r.toFixed(1).padStart(4, "0") : String(Math.floor(r)).padStart(2, "0"));
    }

    // ---- zoom and pan (positions in CSS pixels across the canvas) ----
    const toT = (x) => L.start + (x / W) * L.span;
    function zoom(factor, x = W / 2) {
      const anchor = toT(x), span = Math.max(MIN_SPAN, Math.min(L.dur, L.span / factor));
      view.span = span >= L.dur - 0.01 ? null : span;
      view.start = anchor - (x / W) * span;
    }
    function pan(dx) { if (view.span) view.start += (dx / W) * L.span; }
    function fit() { view.span = null; view.start = 0; }
    function reveal(t) {
      if (!view.span) return;
      if (t < L.start || t > L.start + L.span) view.start = t - L.span * 0.3;
    }

    // What is under a point: lane, time, and the nearest mark (with which edge, for ranges).
    function hit(x, y) {
      const t = toT(x);
      const lane = y < L.rulerY ? "wave" : y < L.marksY ? "ruler" : y < L.energyY ? "marks" : "energy";
      let best = null, bestD = 7;
      L.moments.forEach((m) => {
        const d0 = Math.abs(x - m.x0), d1 = Math.abs(x - m.x1);
        if (d0 < bestD) { best = { n: m.n, edge: "start" }; bestD = d0; }
        if (m.x1 !== m.x0 && d1 < bestD) { best = { n: m.n, edge: "end" }; bestD = d1; }
        if (!best && x > m.x0 && x < m.x1) best = { n: m.n, edge: null };
      });
      return { lane, t, mark: best };
    }

    resize();
    return { resize, draw, hit, zoom, pan, fit, reveal, layout: L, toX: (sec) => ((sec - L.start) / L.span) * W, toT };
  }

  window.Score = { create, duration };
})();
