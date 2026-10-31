# audiovisual-codebook-ideas

A public journal of what I see when I hear music: color, motion, texture and energy, and how they change over the length of a track.

Paper sketches come first. This repo adds **time**. While a song plays, I mark *when* something shifts and how much energy I feel. Later I fill in what I saw and attach photos of my sketches, so each listen can be replayed as a timeline.

> Work in progress. Next up: a page for each session and a public gallery.

---

## Todo

- claude language output, garage cleanup
- design system research and clean up - unify tagging/listening
- touch interface design and gesture constraints/ intuitive tagging system
- sound wave visualization clean up (find library)
- audio input playback synchronization

## What's here

| Page | What it's for |
|---|---|
| **Marker** · `mark.html` | Use while listening. Full-screen and black. The space bar marks moments, a trackpad swipe sets energy. |
| **Editor** · `edit.html` | Use afterwards. Fill in each mark (tags, colors, motion, texture, notes), attach sketch photos, save the session. |
| **Design system** · `docs/design-system.html` | The visual rules every page follows. |
| **Concept** · [`docs/concept.md`](docs/concept.md) | The thinking behind it: vocabulary, data format, decisions. |

## What you need

- A Mac with a trackpad. Other computers work, but the controls are designed for a trackpad.
- **Google Chrome** (recommended). It's the only browser that can save straight into this folder and capture system audio. Safari and Firefox work, but saving downloads files that you move by hand.
- **Python 3**, to run a small local web server. It comes with macOS. If Terminal asks to install developer tools the first time, say yes.

## Run it

**1. Get the code** (first time only)

```bash
git clone https://github.com/mishkin101/audiovisual-codebook-ideas.git
```

**2. Start the local server** from the project folder

```bash
cd audiovisual-codebook-ideas && python3 -m http.server 8765
```

Leave this Terminal window open while you use the journal. Press `Ctrl+C` to stop it.

**3. Open the pages in Chrome**

- Marker: http://localhost:8765/mark.html
- Editor: http://localhost:8765/edit.html

> Opening the `.html` files on GitHub only shows their code. They have to be opened through the local server.

---

## 1 · Listen with the Marker

**Choose where the sound comes from** (bottom left). The waveform at the top is drawn from it.

| Button | Use it for | How |
|---|---|---|
| **File** | A song saved on your computer | Pick an audio file. The whole waveform appears and the Marker plays the song itself. |
| **System** | Spotify Web Player, or any browser tab | Chrome asks what to share. Pick the tab that's playing and turn on **Share tab audio**. The waveform draws live. |
| **Input** | A microphone or audio input | Allow microphone access and pick the input. It hears your speakers, not headphones. To capture the Spotify desktop app, route it through a free loopback driver such as BlackHole. |

The small bar next to the buttons is a level meter. If it moves, the page can hear the music. If you choose no source, marks and energy still work without a waveform.

**Then listen:**

1. Optionally type the title, artist and your mood before. Click **Private** to keep this session off the public repo.
2. Press **Enter** at the same moment the song starts.
3. Mark what you see, and sketch on paper. Write each mark's number (01, 02…) next to the drawing.
4. To play the song again in the same session, press **S** to stop, then **Enter** for a new pass.

| Control | Does |
|---|---|
| **Space**, tap | Instant mark |
| **Space**, hold | Range mark: starts on press, ends on release |
| **Two-finger swipe** | Energy, continuous from 0.00 to 1.00 |
| **Pinch** · **+** **−** **0** | Zoom the timeline in, out, or back to the whole song |
| **Enter** | Start a pass (or a new pass) |
| **S** | Stop the pass |
| **↑ ↓** | Nudge energy |
| **I** | Flip the swipe direction |
| **T** | Input test: shows what the browser receives from the keys and trackpad |
| **Esc** | Show the cursor again (click the score to hide it) |

Everything saves in the browser as you go. A reload won't lose your marks.

## 2 · Fill it in with the Editor

1. Open the Editor and click **From marker**. Your latest listen appears on the same score.
2. Click a mark, or step through marks with **← →**. Fill in its panel on the left:
   - **Tap / Range**: change the kind of mark
   - **Time** and **Energy**: type exact values, or drag a range's edges on the score
   - **Tags**: type and press Enter. Dashed chips suggest tags you've used before.
   - **Colors**: **+** opens a color picker. Your colors are the only color shown anywhere in the interface.
   - **Motion**, **Texture**, **Other** (anything that doesn't fit a field), **Note**
   - **Sketch**: click a photo to pin it to this mark
3. In the right panel, add mood after, place and a reflection. **Add photos** of your paper sketches; iPhone HEIC photos need exporting as JPEG first.
4. Click **Folder** once and choose this project folder. Then **Save** (or `⌘S`) writes:

```
sessions/<date-artist-track>/session.json
sessions/<date-artist-track>/sketch-01.jpg …
```

Private sessions are saved to `private/` instead, which git never uploads.

| Control | Does |
|---|---|
| **Click** a mark | Select it |
| **Double-click** the marks lane | Add a mark there |
| **Drag** a mark or range edge | Change its timing |
| **Pinch**, **swipe** · **+** **−** **0** | Zoom, move along the timeline, fit |
| **← →** | Previous / next mark |
| **⌫** | Delete the selected mark |
| **Z** (or `⌘Z`) | Undo |
| **Audio** button, then **Space** / **N** | Optional: load the track to play/pause, add a mark at the playhead |

Your edits also save in the browser as a draft until you save to the folder.

## 3 · Publish

The repo is public, so anything you commit can be seen.

```bash
git add sessions && git commit -m "Add session" && git push
```

---

## Project layout

```
mark.html             Marker: listen and mark
edit.html             Editor: fill in, attach sketches, save
assets/style.css      Design tokens (black, greys, type, spacing)
assets/score.js       Draws the waveform / marks / energy score, shared by every page
assets/journal.js     Shared helpers (time formatting, storage)
sessions/             Saved public sessions, one folder each
private/              Saved private sessions (ignored by git)
docs/concept.md       Concept, data format and decisions
docs/design-system.html  Visual rules
prompts/              Early notes and prompts
```

## Troubleshooting

- **The page is blank or says "can't be reached".** The server isn't running. Repeat step 2 and keep that window open.
- **The level meter doesn't move.** With **System**, make sure **Share tab audio** was on. With **Input**, check that the right input is selected and that you're not on headphones.
- **Swiping moves energy the wrong way.** Press **I**.
- **The Editor's Save downloads files instead.** You're not in Chrome, or you didn't choose the folder. Click **Folder** in Chrome, or move the downloaded files into `sessions/<date-artist-track>/` yourself.
- **A photo won't add.** It's probably HEIC (iPhone). Export it as JPEG and try again.

---

