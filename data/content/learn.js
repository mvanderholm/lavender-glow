// CONTENT NOTE: All `body` fields below are empty placeholders awaiting Thea's authored content.
// Do not fill these in from external sources or general ayurvedic knowledge.
// Shape: each concept gets a voice memo from Thea → Whisper transcription → adaptation → her review → ship.
// The `teaser` (one-line TOC description) is the only copy here — neutral, factual, non-clinical.

export const concepts = [
  // ─── Tier 1 — Essentials ────────────────────────────────────────────────────
  {
    id: 'doshas',
    tier: 1,
    title: 'The Doshas',
    sanskrit: 'Vata · Pitta · Kapha',
    teaser: 'The three forces that combine in unique proportions in every person.',
    body: null,
    attributedDate: null,
    // Source: transcript #4 (dosha voice memo). Adapt first — this entry comes before any others.
  },
  {
    id: 'prakriti-vikriti',
    tier: 1,
    title: 'Your Constitution',
    sanskrit: 'Prakriti & Vikriti',
    teaser: 'Your home-base blend, and how life shifts you away from it.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'pancha-mahabhutas',
    tier: 1,
    title: 'The Five Elements',
    sanskrit: 'Pancha Mahabhutas',
    teaser: 'The building blocks of everything — including you.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'agni',
    tier: 1,
    title: 'Digestive Fire',
    sanskrit: 'Agni',
    teaser: 'The force that transforms what you take in — food, experience, emotion.',
    // DRAFT — distilled from Thea's voice memo, April 2026. For her review before this is treated as final.
    body: `Agni is your digestive fire — the force that transforms whatever you take in. Food, yes. But also experience. Also emotion. The question isn't just what you eat. It's how well you process it.\n\nThink of a literal fire. Too big, and it's destructive. Too small, and nothing actually gets cooked. Balanced — that's the sweet spot. That balance is what practice is always moving you toward.\n\nAgni lives physically in the gut as metabolic heat. It also lives in the mind as clarity — the capacity to actually move through something, understand it, and let it go. When mental agni is strong, you process your day. When it's dim, things pile up.\n\nThe two are connected. Anything you're carrying mentally — check the body. The body is keeping score.`,
    attributedDate: 'April 2026',
  },
  {
    id: 'ama',
    tier: 1,
    title: 'Toxic Accumulation',
    sanskrit: 'Ama',
    teaser: 'What builds up when digestion is incomplete.',
    // DRAFT — distilled from Thea's voice memo, April 2026. For her review before this is treated as final.
    body: `Ama is what accumulates when agni can't keep up. Undigested food. Undigested experience. Undigested emotion. Same mechanism, different substance.\n\nIts texture: heavy, cold, slimy, dense. It has a lot of kapha in it — that sticky, damp, impeding quality. And while it looks like kapha, ama mixes with all three doshas and changes how each one behaves. Vata, normally dry and light, becomes heavy and damp when ama is in the mix. Pitta, normally hot and sharp, becomes cooler and sluggish. Kapha, already slow, can become completely stuck.\n\nOne of the cleanest ways to check for ama: your tongue first thing in the morning, before eating or drinking anything. Scrape front to back — a spoon works fine if you don't have a tongue scraper. What comes off is ama. That coating is your body's morning report.\n\nAma is also a mental and emotional phenomenon. Negative emotions carry the same qualities — dark, damp, heavy, sticky. They dim mental agni, and when mental agni dims, physical agni follows. The check-in question "what are you carrying that hasn't been processed yet?" is the ama question. The body holds what the mind hasn't metabolized.\n\nTreatment always starts with clearing ama before going after the dosha directly. You can't clean the plate in the dishwasher if the food is still stuck to it — you have to rinse first. Once the body is clear, the deeper work becomes possible.`,
    attributedDate: 'April 2026',
  },

  // ─── Tier 2 — Deepening ─────────────────────────────────────────────────────
  {
    id: 'shad-rasa',
    tier: 2,
    title: 'The Six Tastes',
    sanskrit: 'Shad Rasa',
    teaser: 'The language underneath every food recommendation.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'gunas-qualitative',
    tier: 2,
    title: 'Qualities of Matter',
    sanskrit: 'Gunas (qualitative)',
    teaser: 'Hot/cold, heavy/light, dry/oily — the vocabulary of like increases like.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'gunas-mental',
    tier: 2,
    title: 'Qualities of Mind',
    sanskrit: 'Sattva · Rajas · Tamas',
    teaser: 'The three mental forces and how they shape clarity, drive, and inertia.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'ojas',
    tier: 2,
    title: 'Vital Essence',
    sanskrit: 'Ojas',
    teaser: 'The refined end product of good digestion — vitality, immunity, radiance.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'dinacharya-ritucharya',
    tier: 2,
    title: 'Daily & Seasonal Rhythms',
    sanskrit: 'Dinacharya & Ritucharya',
    teaser: 'Why the clock and the calendar both matter to your practice.',
    body: null,
    attributedDate: null,
  },

  // ─── Tier 3 — Advanced (Thea's call on whether these belong in a consumer app) ──
  {
    id: 'sapta-dhatus',
    tier: 3,
    title: 'The Seven Tissues',
    sanskrit: 'Sapta Dhatus',
    teaser: 'The seven layers of tissue that nutrition builds, in sequence.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'tri-malas',
    tier: 3,
    title: 'The Three Waste Products',
    sanskrit: 'Tri Malas',
    teaser: 'Sweat, urine, and stool as diagnostic signals, not just byproducts.',
    body: null,
    attributedDate: null,
  },
  {
    id: 'srotas',
    tier: 3,
    title: 'The Channel Systems',
    sanskrit: 'Srotas',
    teaser: 'The pathways through which everything flows in the body.',
    body: null,
    attributedDate: null,
  },
];

export const tierLabels = {
  1: 'Essentials',
  2: 'Deepening',
  3: 'Advanced',
};
