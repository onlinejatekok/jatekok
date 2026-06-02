// XP és rang rendszer

const RANKS = [
  { name: "Újonc",      min: 0,    icon: "🪨", color: "#888" },
  { name: "Kezdő",      min: 30,   icon: "🥉", color: "#cd7f32" },
  { name: "Haladó",     min: 100,  icon: "🥈", color: "#c0c0c0" },
  { name: "Tapasztalt", min: 200,  icon: "🥇", color: "#f5c842" },
  { name: "Mester",     min: 350,  icon: "💎", color: "#7c5cfc" },
  { name: "Bajnok",     min: 550,  icon: "👑", color: "#fc5c5c" },
  { name: "Legenda",    min: 800,  icon: "🌟", color: "#c45cfc" },
  { name: "Istenség",   min: 1200, icon: "⚡", color: "#fff" },
];

// XP értékek
const XP_VALUES = {
  correct_letter: 1,  // helyes betű
  word_solved: 5,     // szó megtalálva
  word_perfect: 10,   // szó megtalálva 0 hibával
};

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.min) rank = r;
  }
  return rank;
}

function getNextRank(xp) {
  for (const r of RANKS) {
    if (xp < r.min) return r;
  }
  return null;
}

function getXpProgress(xp) {
  const current = getRank(xp);
  const next = getNextRank(xp);
  if (!next) return { pct: 100, current, next: null, needed: 0, have: 0 };
  const have = xp - current.min;
  const needed = next.min - current.min;
  return { pct: Math.round((have / needed) * 100), current, next, needed, have };
}
