// const normalizeSkills = (skills) => {
//   let normalized = [];

//   for (let skill of skills) {
//     // Remove category labels like "Languages", "Frameworks"
//     let cleaned = skill.replace(/^[a-zA-Z ]+:/, "").trim();

//     // Split if multiple skills exist in one line
//     const parts = cleaned
//       .split(/,|\/|\|/)
//       .map(s => s.trim())
//       .filter(Boolean);

//     normalized.push(...parts);
//   }

//   // Remove duplicates (case-insensitive)
//   const unique = [];
//   const seen = new Set();

//   for (let s of normalized) {
//     const key = s.toLowerCase();
//     if (!seen.has(key)) {
//       seen.add(key);
//       unique.push(s);
//     }
//   }

//   return unique;
// };

// module.exports = normalizeSkills;
const normalizeSkills = (skills) => {
  let normalized = [];

  for (let skill of skills) {
    let cleaned = skill.replace(/^[a-zA-Z ]+:/, "").trim();

    const parts = cleaned
      .split(/,|\/|\||•|;|\s\+\s/)
      .map(s => s.trim())
      .filter(Boolean);

    normalized.push(...parts);
  }

  const unique = [];
  const seen = new Set();

  for (let s of normalized) {
    const key = s.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(s);
    }
  }

  return unique;
};

module.exports = { normalizeSkills };
