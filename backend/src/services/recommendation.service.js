const fetchJobsFromAPI = require("./jobProvider.service");
const matchResumeToJob = require("../utils/skillMatcher");
const extractJobSkills = require("../utils/jobSkillExtractor");
const { getRoleKeywords } = require("./jina.service");

const normalizeSkillForQuery = (skill) => {
  let text = skill.toLowerCase();
  text = text.replace(/\([^)]*\)/g, " ");
  text = text.replace(/\.net/g, " dotnet ");
  text = text.replace(/node\.js/g, " nodejs ");
  text = text.replace(/[^a-z0-9+# ]+/g, " ");
  text = text.replace(/\s+/g, " ").trim();
  return text;
};

const buildSearchQuery = (resumeSkills = []) => {
  const normalized = resumeSkills
    .map(normalizeSkillForQuery)
    .map(s => s.trim())
    .filter(Boolean);

  const unique = Array.from(new Set(normalized));

  // Keep queries short to improve hit rate on job APIs
  const trimmed = unique.slice(0, 6);

  return trimmed.join(" ").trim();
};

const buildSearchQueries = (resumeSkills = [], batchSize = 6, maxBatches = 5) => {
  const normalized = resumeSkills
    .map(normalizeSkillForQuery)
    .map(s => s.trim())
    .filter(Boolean);

  const unique = Array.from(new Set(normalized));

  const queries = [];
  for (let i = 0; i < unique.length; i += batchSize) {
    if (queries.length >= maxBatches) break;
    const batch = unique.slice(i, i + batchSize);
    if (batch.length) {
      queries.push(batch.join(" ").trim());
    }
  }

  return queries;
};

const getRecommendations = async (resumeSkills, location = "") => {
  if (!resumeSkills || resumeSkills.length === 0) {
    return [];
  }

  let roleQueries = [];
  if (process.env.JINA_API_KEY) {
    try {
      roleQueries = await getRoleKeywords(resumeSkills);
      if (roleQueries.length > 0) {
        console.log("JINA ROLE KEYWORDS:", roleQueries);
      } else {
        console.log("JINA ROLE KEYWORDS: empty");
      }
    } catch (error) {
      console.warn("JINA ROLE KEYWORDS ERROR:", error.message || error);
    }
  }

  const skillQueries = buildSearchQueries(resumeSkills);

  const searchQueries = Array.from(
    new Set(
      (roleQueries && roleQueries.length > 0 ? roleQueries : skillQueries).filter(
        Boolean
      )
    )
  );

  const locations =
    location && location.trim().length > 0 ? [location.trim()] : [""];

  let jobs = [];
  let hadSuccess = false;
  for (const q of searchQueries) {
    for (const loc of locations) {
      try {
        const batchJobs = await fetchJobsFromAPI(q, loc);
        jobs = jobs.concat(batchJobs);
        hadSuccess = true;
      } catch (error) {
        console.warn(
          "JOB FETCH ERROR:",
          q,
          loc || "any",
          error.message || error
        );
      }
    }
  }

  if (!hadSuccess) {
    return [];
  }

  const recommendations = jobs.map(job => {
    const jobSkills = extractJobSkills(job.description || "");
    const matchResult =
      jobSkills.length > 0
        ? matchResumeToJob(resumeSkills, jobSkills)
        : matchResumeToJob(resumeSkills, job.description || "");

    return {
      title: job.title,
      company: job.company,
      location: job.location,
      matchedSkills: matchResult.matched,
      score: matchResult.score,
      link: job.link || "#",
    };
  });

  const seen = new Set();
  const uniqueRecs = [];
  for (const rec of recommendations) {
    const key = `${rec.title}::${rec.company}::${rec.location}::${rec.link}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueRecs.push(rec);
    }
  }

  return uniqueRecs.sort((a, b) => b.score - a.score);
};

module.exports = { getRecommendations };
