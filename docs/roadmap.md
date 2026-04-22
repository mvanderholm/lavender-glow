# Lavender Glow Roadmap

Living document. Strike through items as shipped, add new items at the bottom. Reorder only after a conversation with Matt.

---

## Shipped

~~**1. Persist the quiz result via AsyncStorage.**~~
Save primary dosha + score breakdown to `@lavender-glow/primary_dosha`. Welcome screen reads it and shows returning-user state. Recommendations screen uses saved dosha. Done.

~~**2. Guard the recommendations screen.**~~
If no saved dosha and no param, routes to `/quiz` with a friendly message. Hardcoded default removed. Done.

~~**3. Add an "About Thea" screen.**~~
Route `app/about.js` with photo placeholder, name, credentials, bio (draft copy), "book a session" stub, theme switcher, brand style toggle, and Instagram feed component. Linked from welcome screen. Done.

~~**4. Loading and empty states.**~~
Welcome screen handles the AsyncStorage load delay gracefully — no flash of wrong content on first render. Done.

~~**4a. Session summary export.**~~
Check-in data persisted to AsyncStorage by date. "Share summary with Thea" button on the returning-user home screen generates a plain-text summary and opens the native share sheet (hidden on web). Done.

~~**5a. Asana module — data scaffold.**~~
`data/content/movement.js` exists with 3–5 posture entries per dosha. Movement section wired into the recommendations screen with tap-to-expand modal (name, sanskrit, duration, timing, description, benefit). Content is placeholder — awaits Thea's posture descriptions and benefit copy.

~~**6a. Education section — "Learn" module scaffold.**~~
Route `app/learn.js` and `data/content/learn.js` with 15 concept entries across three tiers. Table of contents and detail views built. All content bodies empty, awaiting Thea's voice memos per concept.

~~**7a. Refactor `data/` into `data/content/` and `data/user/`.**~~
Split is live. `data/content/` holds Thea-authored files (herbs, learn, movement, quiz, recommendations). `data/user/` holds AsyncStorage mechanics (storage.js). Done.

~~**8a. Web support + Vercel deployment.**~~
Expo Router static export configured. `vercel.json` added. Download CTAs (App Store / Google Play) shown on web only. `Share` button hidden on web. 480px max-width centering for desktop. Repo live at github.com/mvanderholm/lavender-glow, deployed via Vercel.

---

## Next — requires Thea's voice guide approval first

**1. Rewrite welcome screen copy in Thea's voice.**
Current copy ("Discover your dosha, check in with body and mind…") is scaffold placeholder. Replace once voice guide v0.4 is approved by Thea.

**2. Rewrite daily check-in copy in Thea's voice.**
Same constraint — wait for voice guide approval.

**3. Add the morning hunger question to the daily check-in.**
One new question: "How's your morning hunger today?" Five levels from "no appetite" to "ravenous." Persisted alongside check-in values. Gentle framing — information about digestive fire, not a judgment.

---

## Content work — requires Thea round 2 voice memo

**4. Dosha explanations rewrite.**
Replace placeholder dosha intro copy in `data/content/quiz.js` with Thea's own language. Waiting on her round 2 voice memo.

**5. Asana module — Thea's content.**
Posture descriptions, timing, and benefit copy for each dosha's 3–5 postures in `data/content/movement.js`. Scaffold is built and wired — plug in her content when ready.

**6. Evening / sleep guidance.**
Nothing yet. Waiting on Thea's sleep-and-evening-rituals voice memo. Eventually: a "tonight" section on the recommendations screen or a separate evening companion mode. Janitor metaphor + 10pm–2am window are the anchoring concepts.

**7. Education section — content.**
Fill `data/content/learn.js` entries one at a time via the voice-memo → Whisper → adaptation → Thea review pipeline.

Work order:
1. Adapt dosha transcript (#4) into the first entry. Thea reviews, signs off, ships.
2. Remaining Tier 1 concepts via short prompts → voice memo → adaptation → review.
3. Tier 2 at whatever pace works.

Concept list (prioritized):

*Tier 1 — essentials*
- Doshas (adapt from transcript #4 — first entry)
- Prakriti and vikriti
- Pancha mahabhutas / five elements
- Agni — digestive fire
- Ama — toxic sludge

*Tier 2 — deepening*
- The six tastes / shad rasa
- The gunas (qualitative: hot/cold, light/heavy, dry/oily)
- The three gunas (mental: sattva, rajas, tamas)
- Ojas — vital essence
- Dinacharya and ritucharya

*Tier 3 — advanced / Thea's call*
- Sapta dhatus / seven tissues
- Three malas
- Srotas / channel systems

Do not fabricate entries to fill gaps faster. Empty is correct until Thea has authored each one.

---

## From Thea's voice memos — features to build

**8. "Just for today" daily intention prompt.**
Single fill-in-the-blank prompt per day, grounded in dosha and season. Format: "Just for today, I will ___." 3–5 curated suggestions plus free-text entry. Show on home screen or at top of check-in.

Design constraints (firm):
- No streak tracking. No missed-day state.
- Never call it a "goal" or a "challenge." It's an offering.
- Resets each day. Yesterday doesn't matter.

Content dependency: Thea to author a bank of suggestions per dosha and season. Scaffold (UI + data structure) can be built first.

**9. Daily routine section.**
Dosha-tuned daily rhythm suggestions on the recommendations screen or as its own section. Not a rigid schedule — a gentle orientation.

Anchors Thea named: wake before 6am, phone down after 9pm, in bed before 10pm, food keyed to time of day. Connects to dinacharya/ritucharya in the Learn module.

Content dependency: Thea to author routine suggestions per dosha.

**10. Music / vibration daily suggestion.**
A daily song or playlist recommendation tuned to dosha and check-in state. Light version: one song link. Heavier version: Thea's curated Spotify playlists exposed per dosha/season/energetic state.

Design constraints: friend-texting-a-song tone, not clinical. Thea owns curation. Spotify link-outs fine for mark 1.

⚠️ **Open question before building:** How does Thea want to organize her playlists? By dosha, season, energetic state, or combination? Five-minute conversation that prevents a data-structure refactor later — ask before scaffolding.

**11. Monday Mythbusters.**
Weekly content slot (proposed: Mondays) where Thea busts one received wellness belief. 1–2 paragraphs, her voice, on the home or recommendations screen.

Tone: recognition and relief, not correction or shame. First myth named: fat-free food (the 90s era, what it wired into a generation).

Data shape: title (the myth, plainly stated), Thea's take, practical reframe, publish date. Do not invent entries — scaffold and wait for her content.

---

## Architectural work — do when needed, not preemptively

**12. Check-in history view.**
Hold until real users have at least a week of data. A simple trend of morning hunger over time is the first diagnostically interesting view. Don't over-design before the data exists.

---

## Longer horizon — for when the center gets closer

- Practitioner-side tools: Thea views a client's check-in history before a session.
- "Book a session with Thea" CTA wired to scheduling software, or eventually in-app.
- Account creation and cross-device sync (resist until real users ask for it).
- Content review pass by a second credentialed practitioner.
- App Store / Play Store submission (year two or when Thea is ready for public exposure).

---

## Out of scope (staying that way unless explicitly reopened)

- Monetization. The app's job is to build Thea's reputation and funnel to the center.
- Multi-practitioner content. Lavender Glow is Thea.
- AI-generated clinical content. Everything clinical comes from Thea.
