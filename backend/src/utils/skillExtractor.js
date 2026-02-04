const extractSkills = (text) => {
  if (!text || typeof text !== "string") return [];

  const cleanedText = text
    .replace(/\u2022/g, "•")
    .replace(/\u00b7/g, "•")
    .replace(/\t/g, " ")
    .replace(/[ ]{2,}/g, " ");

  const lines = cleanedText.split("\n").map(l => l.trim()).filter(Boolean);

  let capturing = false;
  let skills = [];
  let capturedAny = false;

  const headerRegex = /^(skills?|technical skills?|key skills?|core competencies|expertise|technologies|tools)\b/i;
  const stopRegex = /^(education|projects|experience|training|internship|certifications|work history|summary|achievements?|awards?|activities|extracurricular|hobbies|interests)\b/i;
  const splitRegex = /,|•|\||\/|;|\s\+\s/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();

    // START: skills section header
    if (headerRegex.test(lower)) {
      capturing = true;

      // Handle inline skills on the same line, e.g. "Skills: Java, SQL"
      const inline = line.split(":")[1];
      if (inline) {
        const parts = inline
          .split(splitRegex)
          .map(s => s.trim())
          .filter(Boolean);
        if (parts.length) {
          skills.push(...parts);
          capturedAny = true;
        }
      }

      continue;
    }

    // STOP when a new section starts
    if (capturing && stopRegex.test(lower)) {
      break;
    }

    // COLLECT lines within the section
    if (capturing) {
      const parts = line
        .replace(/^[a-zA-Z ]+:/, "")
        .split(splitRegex)
        .map(s => s.trim())
        .filter(Boolean);

      if (parts.length) {
        skills.push(...parts);
        capturedAny = true;
      }
    }
  }

  // Fallback: scan for inline "Skills: ..." lines if no section captured
  if (!capturedAny) {
    const inlineMatches = cleanedText.match(/skills?\s*:\s*([^\n]+)/gi) || [];
    inlineMatches.forEach(match => {
      const parts = match
        .split(":")
        .slice(1)
        .join(":")
        .split(splitRegex)
        .map(s => s.trim())
        .filter(Boolean);
      skills.push(...parts);
    });
  }

  const cleanedSkills = skills
    .map(s => s.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter(s => s.split(" ").length <= 3)
    .filter(s => !/^(other|other\s*\(.*\)|etc\.?)$/i.test(s));

  return [...new Set(cleanedSkills)];
};

module.exports = extractSkills;
