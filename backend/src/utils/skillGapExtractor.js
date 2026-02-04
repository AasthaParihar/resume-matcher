const extractSkillGaps = (jobs, resumeSkills) => {
  const resumeSet = new Set(
    resumeSkills.map(skill => skill.toLowerCase())
  );

  const gapSet = new Set();

  jobs.forEach(job => {
    if (!job.description) return;

    const text = job.description.toLowerCase();

    const tokens = text.match(/\b[a-zA-Z+.#+]{2,}\b/g) || [];

    tokens.forEach(token => {
      if (
        token.length > 2 &&
        !resumeSet.has(token) &&
        !/experience|years|degree|skills|knowledge|required|preferred|education|responsibilities|benefits|salary|company|team|work|strong|ability/.test(token)
      ) {
        gapSet.add(token);
      }
    });
  });

  return Array.from(gapSet)
    .slice(0, 8)
    .map(skill =>
      skill.charAt(0).toUpperCase() + skill.slice(1)
    );
};

module.exports = extractSkillGaps;
