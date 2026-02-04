const extractJobSkills = (text) => {
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  let skills = new Set();

  for (let line of lines) {
    const lower = line.toLowerCase();

    // 1️⃣ Identify lines likely to contain skills
    const isSkillLine =
      lower.includes("skill") ||
      lower.includes("experience") ||
      lower.includes("knowledge") ||
      lower.includes("proficient") ||
      lower.includes("familiar") ||
      lower.includes("eligibility") ||
      lower.includes("qualification") ||
      lower.includes("expected");

    if (!isSkillLine) continue;

    // 2️⃣ Clean filler words FIRST
    const cleaned = line
      .replace(/experience in|knowledge of|is a plus|with|and/gi, ",")
      .replace(/[^a-zA-Z0-9+.#, ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // 3️⃣ Split into atomic candidates
    const parts = cleaned
      .split(",")
      .map(p => p.trim())
      .filter(Boolean);

    // 4️⃣ Filter only by structure (not phrases)
    for (let part of parts) {
      if (part.split(" ").length <= 3 && /[a-zA-Z]/.test(part)) {
        skills.add(
          part
            .split(" ")
            .map(w =>
              w.length <= 2
                ? w.toUpperCase()
                : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            )
            .join(" ")
        );
      }
    }
  }

  return [...skills];
};

module.exports = extractJobSkills;
