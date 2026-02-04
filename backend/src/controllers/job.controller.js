const Job = require("../models/job.model");
const extractJobSkills = require("../utils/jobSkillExtractor");

const createJob = async (req, res) => {
  try {
    const { title, company, location, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description required" });
    }

    const extractedSkills = extractJobSkills(description);

    const job = await Job.create({
      title,
      company,
      location,
      description,
      extractedSkills
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job" });
  }
};

module.exports = { createJob };
