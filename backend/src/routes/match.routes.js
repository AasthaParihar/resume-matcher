const express = require("express");
const extractJobSkills = require("../utils/jobSkillExtractor");
const matchSkills = require("../utils/skillMatcher");

const router = express.Router();

router.post("/match", (req, res) => {
  const { resumeSkills, jobDescription } = req.body;

  if (!resumeSkills || !jobDescription) {
    return res.status(400).json({ message: "Missing data" });
  }

  const jobSkills = extractJobSkills(jobDescription);
  const result = matchSkills(resumeSkills, jobSkills);

  res.json({
    jobSkills,
    ...result
  });
});

module.exports = router;
