const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resume.routes");

const matchRoutes = require("./routes/match.routes");

const app = express();

app.use(cors());
app.use(express.json());

const liveRecommendationRoutes = require("./routes/liveRecommendation.routes");

app.use("/api/recommendations", liveRecommendationRoutes);


app.use("/api/resume", resumeRoutes);
app.use("/api/match", matchRoutes);

module.exports = app;