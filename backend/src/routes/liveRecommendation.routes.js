const express = require("express");
const { recommendLiveJobs } = require("../controllers/liveRecommendation.controller");

const router = express.Router();

router.post("/live", recommendLiveJobs);

module.exports = router;
