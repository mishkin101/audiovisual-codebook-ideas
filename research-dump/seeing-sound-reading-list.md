# Seeing Sound: An Annotated Reading List for Building a Personal Music-Visualization Design System

Start with three things: Rainer Wehinger's color-coded listening score for Ligeti's *Artikulation*, Charles Spence's review of the sound–image links most people share, and an evening with the free films of Oskar Fischinger and Norman McLaren. Between them they show the three ideas your design system will rest on. A sketch can be a legend-driven "score" of what you hear. Some sound-to-image mappings are shared by almost everyone and can be used on purpose. And motion, color and form can be composed like music. Everything below is grouped so you can move from history to practice to science to tools at your own pace.

## TL;DR
- **Your sketching practice already has a name and a lineage.** "Listening scores" and "visual music" turn sound into marks, and the closest model to what you're doing is Wehinger's 1970 *Artikulation* score. It uses a timeline, shapes and colors instead of notes, with colors for timbre and pitch, dots for impulses and combs for noise. Build your own legend the same way.
- **Add the sound side to your notebook.** For each sketch, note pitch (high/low), loudness, brightness/timbre, rhythm/onsets, density/texture and mood (major/minor, fast/slow). Research shows widely shared mappings: high pitch goes with high, small and bright; loud goes with big; fast, major-key music goes with lighter, more saturated, yellower colors. Audio-analysis tools can measure these features as RMS, spectral centroid, onsets and chroma.
- **Play before you build.** Free tools cover the whole range: Chrome Music Lab (no code), Sonic Visualiser (for looking at sound), cables.gl and TouchDesigner Non-Commercial (node-based), and p5.js with p5.sound or Hydra (code). Paid VJ software like Synesthesia shows you finished mapping systems you can take apart.

---

## Start Here: A 9-Step Beginner Path
1. **Watch** Wehinger's *Artikulation* listening score, synced to the music on YouTube (≈4 min). It is the clearest example of a drawn legend for sound.
2. **Watch** Norman McLaren's *Synchromy* (1971) on NFB.ca, where "you see what you hear," and then *Pen Point Percussion* (1951), which explains how he drew sound onto film.
3. **Watch** Fischinger's *Studie Nr. 7* or *An Optical Poem* and read the Center for Visual Music's film notes.
4. **Play** with Chrome Music Lab's Kandinsky and Spectrogram experiments for 20 minutes.
5. **Read** Palmer, Schloss et al. (2013), "Music–color associations are mediated by emotion" (or the UC Berkeley press summary).
6. **Skim** Spence (2011), "Crossmodal correspondences: A tutorial review," for the catalogue of shared mappings.
7. **Browse** Stephen Malinowski's Music Animation Machine videos and his notes on "visual orchestration."
8. **Open** one song you've already sketched in Sonic Visualiser (free) and compare its spectrogram with your drawing.
9. **Read** Kandinsky's *Point and Line to Plane* slowly, as a vocabulary of marks, and start a written legend of your own.

---

## A Starter Mapping Table (Sound Quality → Visual Quality)
This connects what you already track (motion, color, perturbation, energy) to the sound side. Use it as a hypothesis to test against your own perception, not as a set of rules.

| Sound quality (how to hear it) | Measurable feature (what analysis tools call it) | Commonly shared visual mapping | Evidence strength |
|---|---|---|---|
| Pitch (high/low) | Fundamental frequency; chroma/pitch class | Vertical position (high = up), smaller size, brighter/lighter | Strong; replicated cross-modal correspondence |
| Loudness / dynamics | RMS energy, loudness | Size, brightness, thickness, opacity | Strong |
| Brightness of timbre ("bright" vs "dark" sound) | Spectral centroid, rolloff | Lightness, sharpness, warm/cool color, edge hardness | Moderate |
| Noisiness vs. purity | Spectral flatness, zero-crossing rate | Grain, texture, scattered dots vs smooth line | Moderate (designer convention plus some evidence) |
| Attacks / rhythm | Onset detection, beat tracking, tempo | Pulses, flashes, repetition, motion speed | Strong as a design convention |
| Harmony / mode / mood | Key and mode estimation, chroma | Hue, saturation, lightness via emotion (major/fast → yellower, lighter, saturated) | Strong for color–emotion; specific chord-to-hue maps are personal |
| Texture / density | Number of simultaneous events; spectral spread | Number of elements, layering, clutter | Design convention |
| Energy changes / tension | Changes in RMS, spectral flux | Perturbation, turbulence, scale changes, camera motion | Design convention |
| Sharp vs. soft sounds (bouba/kiki) | Attack time, spectral content | Angular vs rounded shapes | Strong |

---

## 1. History of Visual Music and Color–Sound Experiments

**Visual Music: Synaesthesia in Art and Music Since 1900** (Kerry Brougher, Jeremy Strick, Ari Wiseman, Judith Zilczer, essay by Olivia Mattis; Thames & Hudson / MOCA & Hirshhorn, 2005). *Exhibition catalog, 271 pp.*
- **What:** The catalog for the exhibition shown at MOCA Los Angeles (Feb–May 2005) and the Hirshhorn (June–Sept 2005). According to the Hirshhorn's exhibition page, the show included more than 90 works by more than 40 artists, from Kandinsky and Kupka through Fischinger, Harry Smith, light shows and Jennifer Steinkamp.
- **Why for you:** It is the best single-volume picture book of the whole field, so you can flip through a century of other people's "what I see when I hear."
- **Mappings:** Color organs (note → hue), abstract painting (musical form → composition), film (rhythm → motion).
- **Access:** Out of print and used copies vary in price. Library is the best route. Beginner-friendly.

**Center for Visual Music (CVM) Library and Film Notes** (Cindy Keefer, director; Los Angeles). *Archive and website.* centerforvisualmusic.org
- **What:** The world's largest visual music archive. It holds Fischinger's films and papers and William Moritz's research collection. Its free online library collects texts on color organs, Fischinger, Bute, Belson and the Whitneys.
- **Why:** The film notes describe how specific films map music. Fischinger's *Studie Nr. 7* sets "sharp, fast rhythms" against "hard-edged shapes" and lets the "sensuous gypsy violins" become "soft but solid shapes," which is almost a ready-made timbre-to-shape rule.
- **Mappings:** Rhythm → hard-edged motion; legato strings → soft, curling forms; darkness as spatial ground.
- **Access:** Free online. DVDs and books (e.g., *Oskar Fischinger: Ten Films*) are paid.

**Oskar Fischinger: Optical Poetry** (William Moritz, Indiana University Press, 2004) and **Oskar Fischinger (1900–1967): Experiments in Cinematic Abstraction** (Cindy Keefer & Jaap Guldemond, eds., EYE Filmmuseum/CVM, 2012–13). *Books.*
- **What:** The standard biography and a richly illustrated monograph on the "father of visual music." The monograph includes his own texts and unshot animation drawings.
- **Why:** Fischinger's drawn graphic notations planning *An American March*, and his *Ornament Sound* experiments where drawn shapes became sound, show sketching at the heart of the craft.
- **Mappings:** Beat → shape entrances; melody → trajectories; ornament → waveform.
- **Access:** Paid. Optical Poetry has been hard to find new. Intermediate.

**Norman McLaren: *Synchromy* (1971) and *Pen Point Percussion* (1951)** (National Film Board of Canada). *Short films.* nfb.ca/film/synchromy and nfb.ca/film/pen_point_percussion
- **What:** In *Synchromy* (7½ min), the rectangles McLaren drew on the optical soundtrack *are* the sound and are also shown on screen in color. *Pen Point Percussion* (6 min) shows him drawing sound by hand.
- **Why:** It is the most literal possible link between drawing and hearing, and a good reminder that your marks could, in principle, run in either direction.
- **Mappings:** Mark height on film → pitch; mark density → rhythm; color added freely per section.
- **Access:** Free to stream on NFB.ca (availability may vary by region). Beginner.

**Lumia: Thomas Wilfred and the Art of Light** (Keely Orgeman, Yale University Art Gallery / Yale University Press, 2017; foreword by James Turrell). *Exhibition catalog plus museum videos.*
- **What:** Wilfred (1889–1968) built the "Clavilux," a keyboard light instrument (he began in 1919), and called his art "lumia." Its core elements were form, color and motion in dark space, plus time. Notably, many lumia were performed in silence.
- **Why:** Wilfred shows that light can carry musical structure (counterpoint, tempo, phrasing) without any sound at all. That's useful if your visuals ever outgrow the song.
- **Mappings:** Musical *form* (counterpoint, development) → slow evolving light; no one-to-one note mapping.
- **Access:** The catalog is paid (≈$45). Smithsonian American Art Museum and Yale have free videos online. Beginner.

**Wassily Kandinsky, *Concerning the Spiritual in Art*** (1911/12). *Book.*
- **What:** Kandinsky's manifesto on color's "inner sound": yellow as trumpet-like and aggressive, blue as deep and cello- or organ-like. It contains the famous "colour is the keyboard… the soul is the piano" passage.
- **Why:** It is the founding text for treating color as having timbre and emotional temperature.
- **Mappings:** Hue → instrument timbre; warm/cool → advancing/receding; lightness → pitch.
- **Access:** Public domain, free on Project Gutenberg. Beginner. Note that his correspondences are poetic and personal, not scientific.

**Color organs to Scriabin: a short self-guided trail.** Louis-Bertrand Castel's proposed "ocular harpsichord" (1720s–1730s) mapped the 12 notes to 12 colors. Alexander Wallace Rimington patented a colour organ and wrote *Colour-Music: The Art of Mobile Colour* (1912). Alexander Scriabin's *Prometheus: The Poem of Fire* (1910) includes a written part for a "luce" (color-light) keyboard. Olivia Mattis's essay "Scriabin to Gershwin" in the *Visual Music* catalog is the best musicologist's guide, and CVM's library lists primary texts on color organs (e.g., Bainbridge Bishop, 1893).
- **Mappings:** Note/pitch class → hue (Castel, Rimington); harmony → color field (Scriabin).
- **Access:** Mixed. Rimington and Bishop are public domain and can be found in digitized libraries. Beginner to intermediate.

**Other pioneers to watch:** Mary Ellen Bute (oscilloscope "seeing sound" films; CVM keeps a research site), Len Lye (scratch-on-film rhythm), John and James Whitney (John's book *Digital Harmony*, 1980, argues for a harmony of motion; CVM holds James's movement diagrams for *Yantra*), Jordan Belson, and Disney's *Fantasia* (1940), whose Bach Toccata and Fugue opening grew out of Fischinger's concept work.

---

## 2. Graphic Scores, Listening Scores and Drawn Sound

**Rainer Wehinger, *Ligeti – Artikulation: Elektronische Musik, eine Hörpartitur*** (Schott, Mainz, 1970). *Listening score; synced video on YouTube.*
- **What:** A score made *after* Ligeti's 1958 tape piece, approved by the composer, to guide listeners. It uses a timeline measured in seconds, "shapes and colors instead of notes on a staff," different colors for variations in timbre and pitch, "dots… for impulses and combs for noise."
- **Why:** It is the single closest model to your practice, a personal visual legend applied consistently over time. Watch for the dense "pile-up" around 3:15.
- **Mappings:** Vertical axis → (approximate) frequency; color → timbre; dot → impulse; comb → noise; horizontal → time.
- **Access:** The video is free. The original print edition is a rare collector's item. Beginner.

**John Cage (with Alison Knowles), *Notations*** (Something Else Press, 1969). *Book.*
- **What:** An anthology of manuscript pages from 269 composers, many of them graphic, collected by Cage.
- **Why:** It shows how wildly different notations can be. Some draw shape, some draw gesture, some draw instructions.
- **Mappings:** Everything from pitch-as-height to purely evocative marks.
- **Access:** Out of print. Libraries and some digitized pages online. Beginner (browse, don't read).

**Theresa Sauer, *Notations 21*** (Mark Batty Publisher, 2009). *Book.*
- **What:** A deliberate update to Cage's *Notations*. According to SUNY Fredonia, it features illustrated scores from 165 composers in 45 countries.
- **Why:** It is the most visually inspiring catalog of 21st-century graphic scores, with lots of color, collage and drawing.
- **Mappings:** Varied: texture-as-texture, color-as-instrument, line-as-gesture.
- **Access:** Paid (used copies are common). Beginner.

**Cornelius Cardew, *Treatise*** (composed 1963–67; published 1967; now Edition Peters). *Graphic score (193 pages).*
- **What:** A 193-page abstract score of lines, circles and numbers with no fixed rules for interpretation.
- **Why:** It is the opposite of a listening score: a drawing that *invites* sound. Use it to think about which of your marks are "descriptive" and which are "generative."
- **Mappings:** A central "life line" (often read as a continuous sound); geometry → gesture, by interpretation.
- **Access:** The score is paid. Many free performances and essays are online (e.g., John Tilbury on *Treatise*). Intermediate.

**Iannis Xenakis's UPIC (1977) and its free successor UPISketch** (Centre Iannis Xenakis). *Instrument/software.* centre-iannis-xenakis.org/upisketch
- **What:** UPIC let composers draw on a tablet and hear the drawing. UPISketch (v1 2018, now v4.0 for macOS, Windows, iOS) is a free modern version for "composing by drawing."
- **Why:** You can turn your own sketches back into sound and test whether a line "sounds" the way it looked.
- **Mappings:** Y-axis → pitch; X-axis → time; line shape → glissando/contour.
- **Access:** Free download. Beginner to intermediate. ZKM also offers the book *From Xenakis's UPIC to Graphic Notation Today* (2020) as a free PDF.

**Daphne Oram and the Oramics Machine** (Daphne Oram Trust; Science Museum, London). *Archive, instrument, website.* daphneoram.org
- **What:** Oram (1925–2003), co-founder of the BBC Radiophonic Workshop, built a machine that read shapes painted on ten strips of 35 mm film through photocells to control pitch, volume, timbre and vibrato. In her words: "every nuance… must be possible just by a change in the written form."
- **Why:** It is a design system in hardware. Each film strip is a separate visual channel for one sound parameter, a good model for splitting your notebook into layers.
- **Mappings:** Separate drawn lanes → pitch, amplitude envelope, waveform/timbre, vibrato.
- **Access:** Website and some audio are free. The machine is in the Science Museum collection. Beginner.

**Stephen Malinowski, Music Animation Machine** (1985–present). *Animated graphical scores (YouTube channel "smalin"); free MIDI player historically.* See also category 6.
- **What:** Colored bars scroll across the screen. Vertical position shows pitch, horizontal shows timing, length shows duration, and a note brightens as it sounds.
- **Why:** It is the most widely viewed living example of a "score for listeners," and it began as a vision he had while listening to Bach.
- **Mappings:** Pitch → height; time → horizontal; duration → length; instrument/voice → color; sounding → brightness.
- **Access:** Free videos. Beginner.

---

## 3. The Science of Sound–Visual Associations

**Charles Spence, "Crossmodal correspondences: A tutorial review"** (*Attention, Perception, & Psychophysics* 73(4): 971–995, 2011). *Review paper.*
- **What:** The key synthesis, with over 2,000 citations. It sorts correspondences into structural, statistical and semantically mediated types.
- **Why:** It gives you the "default" mappings most viewers will find natural, such as the finding that "people consistently match high-pitched sounds with small, bright objects that are located high up in space."
- **Mappings:** Pitch → elevation, size, brightness/lightness, angularity; loudness → size/brightness.
- **Access:** Springer (paywalled; author copies circulate on academic sites). Intermediate, but the introduction and summary tables are readable.

**Palmer, Schloss, Xu & Prado-León, "Music–color associations are mediated by emotion"** (*PNAS* 110: 8836–8841, 2013). *Paper plus press release.*
- **What:** US and Mexican participants picked colors for 18 orchestral excerpts (Bach, Mozart, Brahms). "Faster music in the major mode produced color choices that were more saturated, lighter, and yellower whereas slower, minor music produced the opposite pattern" (desaturated, darker, bluer). Correlations between the emotions of the music and the emotions of the chosen colors were +0.97 for happy/sad, +0.99 for lively/dreary, +0.96 for strong/weak and +0.89 for angry/calm.
- **Why:** It suggests your color system can be built on *emotion* as the bridge: rate the mood, then pick the color.
- **Mappings:** Tempo and mode → lightness, saturation, yellow–blue hue; emotion as mediator.
- **Access:** PNAS (often free after embargo). UC Berkeley's free "Bach to the blues" press summary quotes lead author Stephen Palmer calling the results "remarkably strong and consistent across individuals and cultures." Beginner (press) / intermediate (paper). A related Palmer Lab poster (Griscom & Palmer, 2013) extends this to timbre.

**Richard E. Cytowic & David M. Eagleman, *Wednesday Is Indigo Blue: Discovering the Brain of Synesthesia*** (MIT Press, 2009). *Book.*
- **What:** An accessible tour of synesthesia by its two best-known researchers, including colored hearing (chromesthesia).
- **Why:** It clarifies the difference between true synesthesia (involuntary, consistent, idiosyncratic) and the imagery you are cultivating, which is closer to shared cross-modal correspondence plus imagination. Both are legitimate.
- **Mappings:** Sound → color photisms; consistency over time.
- **Access:** Paid. Beginner.

**Jamie Ward, *The Frog Who Croaked Blue: Synesthesia and the Mixing of the Senses*** (Routledge, 2008). *Book.*
- **What:** A readable scientific introduction by a leading UK researcher, with a good section on how even non-synesthetes share sound–color tendencies (e.g., higher pitch → lighter color).
- **Why:** It is a bridge between the synesthesia literature and the everyday correspondences you can design with.
- **Access:** Paid. Beginner.

**Bouba/kiki (Köhler's "maluma/takete," 1929; Ramachandran & Hubbard's "bouba/kiki," 2001).** *Classic findings.*
- **What:** People overwhelmingly match rounded shapes with soft sounds and spiky shapes with sharp sounds.
- **Why:** It is the most robust shape rule you can borrow: hard attacks and bright timbres call for angular marks, while soft attacks call for curves.
- **Mappings:** Attack/timbre → angular vs. rounded form.
- **Access:** Summaries are free everywhere. Beginner.

**Takeaways for your system:** Cross-modal correspondences such as pitch–height, loudness–size and sharp–spiky are widely shared, so using them makes your visuals "readable" to others. Emotion is a powerful middle layer for color. Truly synesthetic color assignments vary from person to person, so treat your own as personal rather than universal.

---

## 4. The Sound Side: Hearing and Measuring Musical Qualities

**Daniel J. Levitin, *This Is Your Brain on Music*** (Dutton, 2006). *Book.*
- **What:** A popular introduction to pitch, rhythm, tempo, timbre, loudness, harmony and expectation.
- **Why:** It gives you words for what you hear. Its early chapters define the very parameters to log next to your sketches.
- **Access:** Paid / library. Beginner.

**Sonic Visualiser** (Centre for Digital Music, Queen Mary University of London; v5.2.1, March 2025). *Free audio-analysis viewer.* sonicvisualiser.org
- **What:** Free, open-source (GPL) software for Windows, macOS and Linux for "looking at what lies inside the audio file." It offers spectrograms, plus plugins for beat finding, melody extraction, chords, spectral centroid and spectral flux.
- **Why:** Lay its spectrogram next to your sketch for the same song and ask whether your "perturbations" line up with onsets and your "energy" lines up with loudness.
- **Mappings:** Visualizes frequency (vertical) × time (horizontal) × intensity (brightness), which is itself a mapping convention.
- **Access:** Free. Beginner to intermediate.

**Meyda** (JavaScript audio feature extraction library; meyda.js.org). *Tool + documentation.*
- **What:** Real-time feature extraction in the browser: RMS, energy, loudness, spectral centroid, rolloff, flatness, flux, chroma (12 bands by default), MFCC and more. The library's paper by Rawlinson, Segal & Fiala at the 2015 Web Audio Conference (IRCAM, Paris) reported it running about 3.34× real time.
- **Why:** Its feature list is in effect a vocabulary of *measurable* sound qualities, and reading the docs teaches you the terms visualizers use.
- **Mappings (common uses):** RMS → size/brightness; spectral centroid → color temperature or sharpness; flatness → noise/grain; chroma → hue per pitch class.
- **Access:** Free, open source. Intermediate (code). Even the feature definitions are useful for non-coders.

**librosa** (Python library for music and audio analysis) and **Essentia** (Music Technology Group, Universitat Pompeu Fabra). *Tools.*
- **What:** The standard open-source music information retrieval (MIR) toolkits, covering onset detection, beat tracking, tempo, chroma, key estimation and structure.
- **Why:** Use them later if you want to analyze whole songs offline and plot energy arcs to compare against your drawings.
- **Access:** Free. Advanced (code).

**Glossary to tape inside your sketchbook:**
- **RMS/energy:** how loud and powerful the sound is right now. It drives size, brightness and the amount of motion.
- **Spectral centroid:** the "center of mass" of the frequencies, which is why it tracks brightness. It drives lightness, warm/cool color and edge sharpness.
- **Onset/beat:** the moments new sounds start. They drive pulses, flashes, cuts and particle bursts.
- **Spectral flux:** how fast the spectrum is changing. It drives turbulence and perturbation.
- **Chroma:** how much of each of the 12 pitch classes is present. It drives a hue wheel, Castel-style.
- **Spectral flatness:** tonal vs. noise-like sound. It drives smooth vs. grainy texture.

---

## 5. Visual-Language and Design-System Frameworks

**Jacques Bertin, *Semiology of Graphics*** (1967; English trans. 1983; Esri Press reissue 2010). *Book.*
- **What:** It defines the "visual variables": position, size, value (lightness), texture, color hue, orientation and shape. Each is rated for whether it can show order, quantity or category.
- **Why:** It is the best tool for *codifying* your mappings. Ordered sound qualities (pitch, loudness) should map to ordered visual variables (position, size, value). Categorical ones (instrument) map well to hue or shape.
- **Access:** Paid. Intermediate, but the variables chart alone is worth it.

**Wassily Kandinsky, *Point and Line to Plane*** (Bauhaus Book, 1926). *Book.*
- **What:** A systematic grammar of point, line (straight, angular, curved) and the picture plane, including musical analogies and Kandinsky's translation of the opening of Beethoven's Fifth into points.
- **Why:** It is a ready-made mark vocabulary. It treats tension, direction and weight as basic elements, which matches your "perturbations" and "energy."
- **Mappings:** Point → staccato/beat; line → melody/gesture; angular line → tension; curves → release.
- **Access:** Dover paperback (inexpensive). Beginner to intermediate.

**Paul Klee, *Pedagogical Sketchbook*** (Bauhaus Book, 1925; English 1953). *Book.*
- **What:** Klee, a trained violinist, teaches "taking a line for a walk," rhythm in visual structure, and movement. His Bauhaus notebooks include visual transcriptions of musical rhythm and polyphony.
- **Why:** It treats drawing as time-based, the same way you are using it.
- **Access:** Inexpensive paperback. Beginner.

**Pauline Oliveros, *Deep Listening: A Composer's Sound Practice*** (iUniverse, 2005), plus the **Center for Deep Listening** at Rensselaer (deeplistening.rpi.edu). *Book + courses.*
- **What:** Exercises for attentive listening, both focused and global, along with practices for journaling sounds and dreams. The RPI Center (founded 2014) offers online introductory courses and certification.
- **Why:** It is a journaling and listening discipline that sharpens the *sound* side of your notebook.
- **Access:** Book inexpensive; courses paid. Beginner.

**Motion-design principles: the 12 principles of animation (Thomas & Johnston, *The Illusion of Life*, 1981).** *Book.*
- **What:** Squash and stretch, anticipation, timing, ease-in/ease-out, follow-through.
- **Why:** These give you words for *how* things move: an attack as "anticipation then snap," a decay as "ease-out," a perturbation as "secondary action."
- **Mappings:** Envelope (attack/decay) → easing curves; rhythm → timing/spacing.
- **Access:** Paid. Countless free summaries exist. Beginner.

**Make your own legend.** Copy Wehinger's practice of a key page that defines every symbol, and Oram's practice of separate lanes per parameter. For each mark write: *visual variable → sound quality → direction* (e.g., "height ↑ = pitch ↑").

---

## 6. Contemporary Artists, Designers and Projects

**Stephen Malinowski** (Music Animation Machine). *Interviews and process writing.*
- **Process insight:** He moved from showing "what was going on *in the music*" to "what was going on *in the mind of the listener*." According to his 2023 UC Santa Barbara CCS alumni profile, he has built "a collection of over 200 methods of rendering notes visually," and he describes his work as "orchestration in which the notes are assigned to visual instruments." Surprisingly, he reports having aphantasia (no mental imagery) and builds visuals by trial and error.
- **Why:** It is the strongest documented account of choosing mappings on purpose, including keeping a musical subject's visual identity the same however it is transformed (his Beethoven *Große Fuge* notes).
- **Access:** Free (UCSB CCS profile, Popular Beethoven interview, aphantasia.com article, YouTube). Beginner.

**Melissa McCracken** (painter with chromesthesia; melissasmccracken.com). *Interviews and song list.*
- **Process insight:** In interviews (VICE/Broadly, WBUR *Here & Now*, PS Audio *Copper*) she describes guitars as "generally golden and angled," piano as "more marbled and jerky because of the chords," and country music as "muted browns." She also says that synesthetes don't always see the same colors for the same songs.
- **Why:** It shows instrument → texture and shape mappings, and that personal associations are valid design material.
- **Access:** Free interviews; prints paid. Beginner.

**Tetsuya Mizuguchi** (*Rez*, 2001; *Lumines*, 2004; *Tetris Effect*, 2018; Enhance Inc.). *Games + interviews.*
- **Process insight:** *Rez* was conceived with Kandinsky's synesthesia as its inspiration, and the music was written in loopable layers so player actions add sounds on the beat. Mizuguchi argues particles matter only when "reacting to the music and what you're doing," because then they add emotion.
- **Why:** It is the best example of *interactive* mapping, where sound, visual and touch (the Rez "synesthesia suit") are fused.
- **Mappings:** Player hits → quantized sound + flash; layers of music → layers of visual density.
- **Access:** Games are paid; interviews (PC Gamer, GamesBeat, Wccftech, PlayStation Blog, The Japan Times) free. Beginner.

**Ryoji Ikeda** (*test pattern*, *datamatics*, *data-verse*). *Installations and performances.*
- **What:** Strictly black-and-white, high-speed, data-like visuals locked to clicks and sine tones.
- **Why:** It shows a *minimal* system that maps only rhythm/onset and frequency to binary flicker and barcode patterns, proving how far restraint can go.
- **Access:** Official site and documentation videos free; exhibitions vary. Beginner to watch.

**Robert Hodgin** (Flight404; *Magnetosphere*, the iTunes visualizer from 2007). *Projects + talks.*
- **What:** Physics-driven particle systems that respond to frequency bands.
- **Why:** It shows a classic audio-reactive recipe (frequency bands → forces on particles), which makes "perturbation" literal.
- **Access:** Talks and portfolio free online. Intermediate.

**Olivia Jack** (creator of Hydra). *Artist + tool maker.*
- **What:** Her live-coded performances are "explosions of color and texture," built on ideas of feedback and analog video synthesis. She also made PIXELSYNTH (2016), a browser synth that makes sound from images, inspired by the 1937 ANS synthesizer.
- **Why:** Both directions, sound→image and image→sound, show up in one artist's practice.
- **Access:** Free (ojack.xyz; CDM interview). Beginner to intermediate.

---

## 7. Tools to Explore (No-Code → Code)

| Tool | What it teaches you about mapping | Cost (late 2026) | Skill |
|---|---|---|---|
| **Chrome Music Lab: Kandinsky** (musiclab.chromeexperiments.com/Kandinsky) | Reverse mapping: drawings become sound. Higher on the canvas = higher pitch; triangles = percussion; circles and closed shapes get "faces" and different voices | Free, browser | No-code |
| **Chrome Music Lab: Spectrogram** | Live picture of frequency vs. time from your mic | Free | No-code |
| **Sonic Visualiser 5.2.1** | Spectrograms, beat and onset plugins, spectral centroid | Free, open source | Beginner–intermediate |
| **UPISketch 4.0** (Centre Iannis Xenakis) | Draw → sound, Xenakis-style | Free | Beginner |
| **Synesthesia** (synesthesia.live) | Ready-made audio-reactive scenes (the vendor advertises "100+ built-in & free scenes"); you can see which audio feature drives which parameter, and it can send its audio analysis over OSC | Free watermarked trial; one-time licenses of $199 Standard / $399 Pro per the vendor's pricing page; $60/yr optional updates; education discount unclear (the pricing page mentions 50%, but the vendor's License FAQ says "Right now we don't offer any educational discount") | No-code |
| **Resolume Avenue/Arena** | Industry-standard VJ software; clip mixing with audio-reactive parameters | Paid; free watermarked demo | No-code–intermediate |
| **cables.gl** | Node-based patching in the browser with FFT/audio input; MIT-licensed open source, standalone offline app | Free | Low-code |
| **TouchDesigner** (Derivative; build 2025.33230, Sept 2026) | Pro-level node-based real-time visuals; audio CHOPs for analysis | Non-Commercial free (1280×1280 cap, not for paid work); Commercial/Pro paid | Intermediate |
| **Max/MSP/Jitter** (Cycling '74) | Patching for audio and video together | Paid (subscription or permanent; free trial) | Intermediate–advanced |
| **p5.js + p5.sound** (Processing Foundation) | Code sketches with amplitude and FFT analysis; very beginner-friendly community | Free | Beginner code. Note: p5.js 2.x needs the separate p5.sound v0.4.x (some classes removed in favor of Tone.js); ignore the outdated p5.sound bundled in the old "complete" zip |
| **Processing** | The original creative-coding environment (Java) with a Sound library | Free | Beginner code |
| **Hydra** (hydra.ojack.xyz) | Live-coded video synth in the browser; built-in audio reactivity; inspired by analog modular synthesis | Free, open source | Beginner–intermediate code |
| **Meyda / librosa** | Named audio features (RMS, centroid, chroma…) | Free | Code |
| **AI music-reactive generators** (e.g., Neural Frames and similar) | Prompt-based or stem-based visuals synced to audio | Subscription tiers vary | No-code |

**A note on AI tools:** They are useful for quick moodboards, but they tend to hide the mapping decisions you are trying to learn. Use them to react against ("that's not what this bassline looks like to me") rather than to define your system.

---

## 8. Communities, Archives, Journals and Conferences

- **Center for Visual Music** (Los Angeles; centerforvisualmusic.org): archive, free online library, DVDs, and a Patreon with exclusive archival content. Best starting archive.
- **iotaCenter** (Los Angeles, founded 1994; iotacenter.org): abstract and visual-music film. Its Culver City library has closed, and over 2,400 items from its collection are now held at the Academy Film Archive. Treat it as a historical resource, since current activity is unconfirmed.
- **Daphne Oram Trust** (daphneoram.org): archive, audio and Oram's book *An Individual Note of Music, Sound and Electronics*.
- ***Leonardo*** (MIT Press; journal of art, science and technology) and ***Organised Sound*** (Cambridge University Press; electroacoustic music, including frequent visual-music issues): scholarly but browsable, mostly paywalled, some open-access articles. Intermediate–advanced.
- **NIME, New Interfaces for Musical Expression:** the annual conference on new instruments and audiovisual interfaces. NIME 2026 took place in London (June 23–26, hybrid; theme "Communities"). Its proceedings archive at nime.org is free.
- **Synesthesia associations:** the **American Synesthesia Association** (synesthesia.info; still filing as a nonprofit, held a joint 2024 conference at Oxford with the UK group, though the website appears rarely updated), the **UK Synaesthesia Association** (uksynaesthesia.com; active), and **IASAS**, the International Association of Synaesthetes, Artists and Scientists (iasasevents.com; held an Amsterdam 2026 event, and welcomes artists who aren't synesthetes).
- **Center for Deep Listening at RPI** (deeplistening.rpi.edu): online courses and certification in Oliveros's practice.
- **Online communities:** the TouchDesigner forum (derivative.ca), the p5.js community and the Processing Foundation forum, the Hydra community database ("hydra internet garden"), cables.gl's library of "made with cables" projects, and CDM (cdm.link) for news on audiovisual tools.

---

## Directions to Explore Next
1. **Mapping fidelity vs. feeling:** Do you want to show *what is in the music* (like early Malinowski) or *what's in your mind* (like his later work and McCracken)? Your answer decides whether to lean on measured features or on emotional mediation.
2. **One-to-one or many-to-one?** Test a minimal Ikeda-style system (two or three mappings) against a rich Fischinger-style one. Which reads more clearly?
3. **Consistency testing:** Re-sketch the same song a week apart. Stable associations are candidates for your "core" vocabulary; shifting ones are "expressive" layers.
4. **Sound → image or image → sound?** Feed a sketch into UPISketch or Chrome Music Lab's Kandinsky and hear whether it "sounds right."
5. **Form-level mapping:** Beyond moment-to-moment features, how do you show a song's *structure* (verse/chorus, build-and-drop)? Look at Wehinger's sections A–G and the energy curves you can make in Sonic Visualiser.
6. **Medium:** Will this live on paper, in animation, or as a live audio-reactive piece? Paper favors Bertin and Kandinsky; live work favors Meyda/TouchDesigner thinking about smoothing and latency.
7. **Culture and genre:** Palmer's results were for Western classical music in two cultures. Do your mappings for hip-hop, ambient or non-Western scales follow the same emotional logic?

## Caveats
- Synesthesia claims about historical figures (Kandinsky, Scriabin) are debated. Kandinsky's is widely asserted, while Scriabin's color system may have been partly theoretical. Treat their color charts as artistic systems, not perception data.
- Cross-modal findings are average tendencies from lab studies, mostly with Western participants, and individual mappings vary.
- Software prices and versions change. The vendor's own pricing page confirms Synesthesia's $199 Standard and $399 Pro licenses, the trial watermark and the $60/year updates, but its pages disagree on whether an education discount is offered. TouchDesigner, Sonic Visualiser, cables.gl, Hydra and p5.sound status were checked against their official pages as of 2025–2026. One DJ-software comparison site wrongly lists Synesthesia as Mac-only; vendor-aligned guides list Windows and macOS.
- Some older catalogs (*Visual Music*, Cage's *Notations*) are out of print. Libraries and interlibrary loan are your friends.
