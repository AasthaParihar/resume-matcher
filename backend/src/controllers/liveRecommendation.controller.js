const { getRecommendations } = require("../services/recommendation.service");

const recommendLiveJobs = async (req, res) => {
  try {
    const { resumeSkills, location } = req.body;

    if (!resumeSkills || resumeSkills.length === 0) {
      return res.status(400).json({ message: "Resume skills required" });
    }

    const recommendations = await getRecommendations(
      resumeSkills,
      location || ""
    );

    res.json({ recommendations });
  } catch (err) {
    console.error("LIVE JOB ERROR STACK:");
    console.error(err?.response?.status, err?.response?.data || err?.message || err);
    console.error(err.stack || err);

    res.status(500).json({
      message: "Failed to fetch live job recommendations",
      error: err?.response?.data || err.message,
    });
  }
};

module.exports = { recommendLiveJobs };
