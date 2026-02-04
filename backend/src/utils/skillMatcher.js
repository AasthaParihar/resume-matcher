// const matchResumeToJob = (resumeSkills, jobDescription) => {
//   const jdText = jobDescription.toLowerCase();

//   const matched = resumeSkills.filter(skill =>
//     jdText.includes(skill.toLowerCase())
//   );

//   const score = Math.round(
//     (matched.length / resumeSkills.length) * 100
//   );

//   return {
//     matched,
//     score
//   };
// };

// module.exports = matchResumeToJob;

const matchResumeToJob = (resumeSkills, jobSkillsOrDescription) => {
  if (!Array.isArray(resumeSkills) || resumeSkills.length === 0) {
    return { matched: [], score: 0 };
  }

  if (typeof jobSkillsOrDescription === "string") {
    const jdText = jobSkillsOrDescription.toLowerCase();
    const matched = resumeSkills.filter(skill =>
      jdText.includes(skill.toLowerCase())
    );

    const score = Math.round((matched.length / resumeSkills.length) * 100);
    return { matched, score };
  }

  if (!Array.isArray(jobSkillsOrDescription)) {
    return { matched: [], score: 0 };
  }

  const resumeSet = new Set(
    resumeSkills.map(s => s.toLowerCase())
  );

  const matched = jobSkillsOrDescription.filter(skill =>
    resumeSet.has(skill.toLowerCase())
  );

  const score =
    jobSkillsOrDescription.length === 0
      ? 0
      : Math.round((matched.length / jobSkillsOrDescription.length) * 100);

  return { matched, score };
};

module.exports = matchResumeToJob;
