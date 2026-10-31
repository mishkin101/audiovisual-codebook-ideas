# Listening Journal: Concept

> Status: draft for review. Nothing is built yet. Edit freely.

## Why
I see music: color, motion, texture, shifts in energy. I sketch these on paper while a track plays. A drawing is static, but the experience **unfolds over time**. This journal adds that missing dimension of time while keeping pen and paper at the center.

## Principles
- **Paper first.** The screen never competes with the sketchbook.
- **One tap in the moment.** While the music plays, the only screen action is marking *when* something shifts.
- **Details later.** Colors, motions, words and photos of sketches are added afterwards, calmly.
- **Public by design.** This repo is public. Anything committed can be seen. Mood fields are optional.
- **Simple and hackable.** Plain HTML/JS, no build step, so it can be read and tweaked.

## Vocabulary
| Term | Meaning |
|---|---|
| **Session** | One track on one day, including every time I play it that day (each play is a **pass**). Holds the track, source, date, context, and optional mood before/after in free words. It can be marked **private**. |
| **Moment** | Either a single **instant** or a **range** (start and end) in the track, filled in later with tags, color(s), motion, texture, energy (1-5), **other** (anything that doesn't fit a field), and a short note. Every field is optional. |
| **Sketch** | A photo of a paper drawing, optionally pinned to a moment or a time range. |
| **Codebook** | Starts empty. It grows on its own from the tags I actually use, and I can add a meaning to a term whenever one becomes clear (e.g. *fizz* = hi-hats, silver, upward). |
| **Reflection** | Free text after the track ends. |

## Daily flow
1. **Listen + mark.** Open the Marker (`mark.html`, full screen, black). Pick a source: **File** for a local track (the whole waveform appears up front), or **Input / System** for Spotify (the waveform draws live as it plays). Press **Enter** to start a pass.
2. **One hand marks, the other sets energy:**
   - **Space** tap = instant mark · **hold space** = range
   - **Two-finger swipe** on the trackpad = energy, a continuous 0.00 to 1.00 scale (clicks never make marks)
   - **Pinch** zooms the score (it follows the playhead); **+ / − / 0** zoom in, out, fit
   - Other keys: arrow keys nudge energy, **S** stop, **T** input test, **I** invert swipe direction
3. **Sketch on paper** as usual, writing mark numbers (01, 02…) next to the drawings.
4. **Digitize later** in the editor (`edit.html`). **From marker** loads the latest listen onto the same black score. Click a mark to fill in tags, colors, motion, texture, *other* and a note (chips suggest what I've used before). Add sketch photos and pin each to a mark. Pinch to zoom into the timeline and swipe to move along it (+ / − / 0 also work). Fix timing by dragging edges or typing times; double-click to add a mark; ⌫ deletes; Z undoes. Optionally load the audio to listen while editing.
5. **Save.** In Chrome, choose the repo folder once; **Save** (⌘S) writes `sessions/<date-artist-track>/` with `session.json` and the sketch photos (shrunk to 1600px JPEGs), or `private/…` for private sessions. Other browsers download the files instead.
6. **Commit and push.** GitHub Pages updates the public gallery.

> Spotify's desktop app doesn't share its audio with webpages. The Marker listens instead: **System** captures computer audio where the browser allows it, and **Input** listens to an audio input. A free loopback driver (e.g. BlackHole) can route Spotify into **Input** without a microphone.
> **T** opens an input test that shows what the browser receives, including swiping while space is held.

## Design system
Architectural, brutalist, minimal: pure monochrome on black, hairline rules, square corners, one monospace typeface, full-bleed layouts. Spec: [`docs/design-system.html`](design-system.html). Tokens: `assets/style.css`. The score is drawn by `assets/score.js`, shared by every page.

## Review: what I want to discover
1. **How a track's visuals evolve.** A *track strip*: a horizontal timeline with color bands between moments, an energy curve, tags, and sketch thumbnails at their timestamps. The static picture turned back into motion.
2. **My personal vocabulary.** A codebook view showing each term, where it shows up, and which colors and motions co-occur with it.
3. **Emotion connections.** The same song on different days, shown as stacked strips with a mood overlay.
4. **Links to the audio itself.** For local files, the browser can compute a loudness envelope or waveform under the strip. Spotify's audio-features API is closed to new apps (since late 2024), so tempo and key for streamed tracks would be entered by hand or come from local analysis. Check current options before building.

## Proposed repo layout
```
index.html            public gallery
mark.html             in-the-moment tap marker
edit.html             digitize / session editor
session.html          single-session track strip
assets/               shared JS + CSS
sessions/<yyyy-mm-dd>-<artist>-<track>/
    session.json
    sketch-1.jpg ...
sessions/index.json   list of sessions (rebuilt by a script)
codebook.json         my vocabulary
docs/concept.md       this file
```

## Draft `session.json`
`n` is the mark number written on paper. It never changes, even if other marks are deleted. `kind` is `tap` or `range`. Energy is continuous from 0 to 1; `energy_log` samples it (up to 10 per second) during each pass. `waveform.peaks` holds the loudest level 50 times per second, from the file or from live capture.

```json
{
  "id": "2026-10-30-artist-track",
  "date": "2026-10-30",
  "private": false,
  "passes": [
    { "n": 1, "started": "18:05", "ended_s": 312.4, "energy_log": [ { "t_s": 0, "energy": 0.5 }, { "t_s": 95.1, "energy": 0.82 } ] },
    { "n": 2, "started": "18:20", "ended_s": 310.0, "energy_log": [] }
  ],
  "track": { "title": "", "artist": "", "source": "spotify", "url": "", "duration_s": 0 },
  "context": { "time_of_day": "evening", "place": "", "mood_before": "free words", "mood_after": "free words" },
  "moments": [
    { "n": 1, "pass": 1, "kind": "tap", "t_s": 42.5, "t_end_s": null, "energy": 0.62, "tags": ["fizz"], "colors": ["#c0c8d0"], "motion": "rising", "texture": "grainy", "other": "", "note": "", "sketch": "sketch-1.jpg" },
    { "n": 2, "pass": 2, "kind": "range", "t_s": 60, "t_end_s": 75, "energy": 0.91, "tags": [], "colors": [], "motion": "", "texture": "", "other": "felt like being inside it", "note": "" }
  ],
  "sketches": [ { "file": "sketch-1.jpg", "t_start_s": 30, "t_end_s": 60, "caption": "" } ],
  "reflection": "",
  "waveform": { "source": "file", "rate_hz": 50, "peaks": [0.02, 0.11, 0.34] },
  "audio_features": null
}
```

## Build order
1. ✅ This concept doc
2. ✅ Design system (`docs/design-system.html`) and Marker (`mark.html`): full-screen score with waveform, marks lane and continuous energy; space marks, trackpad swipe sets energy
3. ✅ Session editor (`edit.html`): fill in moments, suggestion chips, sketch photos, retiming, undo, save into the repo folder
4. ✅ Session page (`session.html`) and gallery (`index.html`); the Editor writes `sessions/index.json`; GitHub Pages ready (enable in repo settings)
5. First real session from a recent sketch
6. Later: codebook view, same-song comparison, audio features

## Decisions
- **Emotions:** free words. No list or wheel for now; patterns can come later.
- **Other:** every moment has an *other* field so nothing has to be forced into a category.
- **Instants and ranges:** both are supported. Tap marks an instant; hold marks a range. `t_end_s` is empty for instants.
- **Codebook:** no starter vocabulary. It grows from use.
- **Repeat listens:** the same song on the same day stays in one session. Each play is a numbered *pass* with its own stopwatch, so passes can be compared on the track strip.
- **Watching *other*:** a review view will list *other* entries side by side so recurring themes stand out. When one keeps appearing, it gets promoted to its own field.
- **Private sessions:** a session has a `private` flag. Because this repo is public, anything committed is visible, even if the gallery hides it. So private sessions are saved to a `private/` folder that git ignores. They stay on my computer, never get pushed, and still show up in my local views.

## Open questions
- None right now. New ones get added as sessions happen.
