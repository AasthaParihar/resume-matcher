const axios = require("axios");

const fetchJobsFromAPI = async (query = "", location = "") => {
  const params = {
    query,
    page: 1,
    num_pages: 1,
  };

  if (location) {
    params.location = location;
  }

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params,
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST
    }
  };

  try {
    const response = await axios.request(options);
    const jobs = Array.isArray(response?.data?.data) ? response.data.data : [];

    console.log("RAPIDAPI JOBS FETCH:", {
      query,
      location,
      count: jobs.length
    });

    // Normalize job data
    return jobs.map(job => ({
      title: job.job_title,
      company: job.employer_name,
      location: job.job_city || job.job_country,
      description: job.job_description || "",
      link: job.job_apply_link || job.job_google_link
    }));
  } catch (error) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    console.error("RAPIDAPI ERROR:", status, data || error.message);
    throw error;
  }
};


module.exports = fetchJobsFromAPI;
