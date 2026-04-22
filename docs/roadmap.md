# Lavender Glow Roadmap

Living document. Strike through items as shipped, add new items at the bottom. Reorder only after a conversation with Matt.

---

## This week — mechanical, no Thea dependency

**1. Persist the quiz result via AsyncStorage.**
Save the primary dosha and the full score breakdown to `@lavender-glow/primary_dosha` when the result screen loads. Read it on the welcome screen (show "Welcome back" + primary dosha name instead of the three cold buttons if a result exists). Read it on the recommendations screen (use saved dosha instead of hardcoded default).

**2. Guard the recommendations screen.**
Current behavior: silently defaults to `'pitta'` if no param is passed. Change to: if no saved dosha and no param, route to `/quiz` with a friendly message ("Let's find out your constitution first"). Remove the hardcoded default.

**3. Add an "About Thea" screen.**
New route `app/about.js`. Placeholder content is fine for now — structure first, copy later. Include: her photo (blank for now), her name and credentials, a few-paragraph bio in her voice (once voice guide is approved), and room for a "book a session" CTA that's not yet wired (for the future center). Link to it from a small icon/link in the welcome screen header, not as a primary action.

**4. Small polish: loading and empty states.**
The welcome screen currently assumes everything loads instantly. Once AsyncStorage is in play, there will be a brief "unknown" state on first render. Handle it gracefully with a subtle loading state, not a flash of wrong content.

**4a. Session summary export.**
Persist check-in data to AsyncStorage on submit (keyed by date: `@lavender-glow/checkins/YYYY-MM-DD`). Add a "Share with Thea" button to the returning user block on the welcome screen. Tapping it generates a plain-text session summary — constitution, score breakdown, last 7 days of check-ins with notes — and opens the native share sheet. No backend, no new dependencies. Designed to be sent to Thea before a session as a data-driven briefing.
Deliberate scope limit: Thea reads the summary and writes her own protocol. The app surfaces signal; she makes the clinical call. AI-generated protocols are explicitly out of scope until this has been used in real sessions and Thea has shaped what she actually wants to see.

---

## Next — requires Thea's voice guide approval first

**5. Rewrite welcome screen copy in Thea's voice.**
The current "Discover your dosha, check in with body and mind…" is placeholder copy from the scaffold. Replace once voice guide v0.2 (or later) is approved by Thea. Do not rewrite before then — it'll just need rewriting again.

**6. Rewrite daily check-in copy in Thea's voice.**
Same constraint — wait for voice guide approval.

**7. Add the morning hunger question to the daily check-in.**
One new question: "How's your morning hunger today?" with 5 levels from "no appetite" to "ravenous." Persist alongside other check-in values under `@lavender-glow/checkins/{YYYY-MM-DD}`. This is the first real diagnostic signal the app captures. Gentle framing — this is not a judgment, it's information about digestive fire.

---

## Content work — requires Thea round 2 voice memo

**8. Dosha explanations rewrite.**
Replace placeholder dosha intro copy in `data/quiz.js` with Thea's own language for how she introduces vata, pitta, and kapha to new clients. Waiting on her round 2 voice memo (question 2 from the voice guide).

**9. Asana module — data scaffold first, content later.**
New file `data/movement.js` with empty entries per dosha: 3–5 postures, each with name, sanskrit name, description, when to do it, how long, what it helps with. Structure first, plug Thea's content in when she provides it. New section on the recommendations screen: "Movement for today."
This closes the biggest gap in mark 1 — it's in the name of the app and currently not represented at all.

**10. Evening / sleep guidance.**
Nothing yet. Waiting on Thea's sleep-and-evening-rituals voice memo. Eventually: a separate evening companion mode, or a "tonight" section on the recommendations screen. Janitor metaphor + 10pm–2am window are the anchoring concepts.

**11. Education section — "Learn" module.**
A new route (`app/learn.js`) with a table of contents of classical ayurvedic concepts, each backed by a data entry in `data/learn.js`. Builds at the speed Thea can author each concept — scaffold first, content second.

Work order:
1. **Scaffolding only (no Thea dependency):** route, data structure, table of contents page. Each concept entry has title, Sanskrit term, one-line neutral teaser, attribution, and a body field that starts empty or with "Thea is working on this one."
2. **First real entry:** adapt the existing dosha transcript (#4) into the first education entry — lightly edited for flow, Sanskrit corrected, filler cleaned without losing her voice. Thea reviews, signs off, ships.
3. **Remaining concepts via voice-memo prompts:** one short prompt per concept → Thea records → Whisper transcription → adaptation → her review → ship.

Concept list (prioritized by what's most foundational to app users):

*Tier 1 — essentials*
- Doshas (adapt from transcript #4 — first entry)
- Prakriti and vikriti (resolves the slip in the dosha transcript; we have hints, needs expansion)
- Pancha mahabhutas / five elements (partially covered in dosha transcript)
- Agni — digestive fire (central to everything; appears in case-study transcript)
- Ama — toxic sludge (mentioned in what-we-get-wrong transcript)

*Tier 2 — deepening*
- The six tastes / shad rasa (underpins all food recommendations)
- The gunas in the qualitative sense (hot/cold, light/heavy, dry/oily — the language underneath "like increases like")
- The three gunas in the mental sense (sattva, rajas, tamas)
- Ojas — vital essence (appears in herbs data file)
- Dinacharya and ritucharya — daily and seasonal cycles

*Tier 3 — advanced / Thea's call on whether these belong in a consumer app*
- Sapta dhatus / seven tissues
- Three malas
- Srotas / channel systems

At one concept per week, Tier 1+2 is done in ~10 weeks. At one per month, a year. Either pace is fine for a 3–5 year horizon. Do not fabricate content to fill gaps faster — empty entries are correct until Thea has authored each one.

---

## From Thea's 80/20 voice memo — new features

**12. "Just for today" daily intention prompt.**
A single fill-in-the-blank prompt surfaced once per day, grounded in the user's dosha and the current season. Format: "Just for today, I will ___." Offer 3–5 curated suggestions (Thea to author per dosha/season) plus free-text entry. Show it on the home screen or at the top of the daily check-in — somewhere it's seen before the day gets going.

Design constraints (these are firm, from Thea's intent):
- No streak tracking. No "you've done this 5 days in a row." No missed-day state.
- Never call it a "goal" or a "challenge." It's a daily offering.
- The prompt resets each day and doesn't carry forward. Yesterday doesn't matter.

Content dependency: Thea to author a bank of "just for today" suggestions per dosha and season. The scaffold (UI + data structure) can be built first; suggestions plug in after.

**14. Music / vibration daily suggestion.**
A daily song or playlist recommendation surfaced alongside (or as part of) the recommendations screen. Tuned to the user's dosha and check-in state for the day — the balancing principle applied to sound. Light version: one song link per day. Heavier version: Thea's own curated Spotify playlists exposed per dosha/season/energetic state.

Design constraints:
- Language should feel like a friend texting a song, not a prescription. No "music for your dosha" clinical framing.
- Thea owns the curation entirely. Data scaffold first, her content plugs in after.
- Spotify link-outs are fine for mark 1. No in-app playback needed.

Content dependency: Thea to provide song/playlist selections per category. She has ~200 Spotify playlists; the question is how to organize and surface them. Worth a short conversation about the taxonomy she'd want (by dosha? by season? by energetic state?).

⚠️ **Open question — needs answer before building:** How does Thea want to organize her playlists for the app? Options: by dosha (vata/pitta/kapha), by season, by energetic state (scattered/grounded/sluggish/activated), or some combination. The taxonomy determines the entire data structure. This is a five-minute conversation that prevents a refactor later — ask her before scaffolding anything.

**15. Monday Mythbusters.**
A weekly content slot — proposed cadence: Mondays — where Thea busts one received wellness belief. Short format (1–2 paragraphs, her voice), shown on the home screen or as a content card on the recommendations screen.

Tone is firm: recognition and relief, not correction or shame. User should read it and think "oh thank god, I knew something felt off about that" — not "I've been doing it wrong."

Thea will surface specific myths as they come to her. First one named: fat-free food (the 90s fat-free era and what it implanted, particularly for women in their 40s). Do not invent entries. Scaffold the data structure and cadence; her content drops in.

Data shape needed: title (the myth, plainly stated), Thea's take, practical reframe, publish date.

**13. Daily routine section.**
A dedicated section — likely on the recommendations screen or as its own tab — surfacing simple, dosha-tuned daily rhythm suggestions. Not a rigid schedule. A gentle orientation toward the day.

Anchors Thea named:
- Wake before 6am (or: wake 5 minutes earlier than yesterday)
- Phone down after 9pm
- In bed before 10pm
- Food suggestions keyed to time of day, not just dosha

This connects directly to dinacharya (daily rhythms) and ritucharya (seasonal rhythms), which are already in the Learn module as concept entries. The routine section is the *practical* surface for those concepts — teaching by doing, not by explaining.

Content dependency: Thea to author a set of routine suggestions per dosha. Start with the ones she named (wake time, phone cutoff, sleep time) as a scaffold; she fills in the rest.

---

## Architectural work — do when needed, not preemptively

**11. Refactor `data/` into `data/content/` and `data/user/`.**
Do this right before introducing `data/movement.js` (item 9). The split makes it obvious which files need Thea's clinical review before changes ship, and which are app mechanics.

**12. Check-in history view.**
Hold until real users have at least a week of data. Building it sooner means designing for data that doesn't exist. A simple trend of morning hunger over time is diagnostically interesting on its own — don't over-design this.

---

## Longer horizon — for when the center gets closer

- Practitioner-side tools: a way for Thea to view a client's check-in history before a session.
- "Book a session with Thea" CTA actually wired up (links out to scheduling software, or eventually an in-app flow).
- Account creation and cross-device sync (only when clearly needed — resist until real users ask).
- Content review pass by a second credentialed practitioner, for safety.

---

## Out of scope (and staying that way unless explicitly reopened)

- Public launch to App Store / Play Store in year one. Year one is private craft.
- Monetization. The app's job is not to make money directly — it's to build Thea's reputation and funnel to the future center.
- Multi-practitioner content. Lavender Glow is Thea. If that ever changes, it's a major decision, not a feature addition.
- AI-generated clinical content. Everything clinical comes from Thea.
