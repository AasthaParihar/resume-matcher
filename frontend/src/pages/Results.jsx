import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

const getInferredRoles = (jobs) => {
  const titles = (jobs || [])
    .map((job) => job.title || job.role || job.position)
    .filter(Boolean);

  return Array.from(new Set(titles)).slice(0, 6);
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file;
  const selectedLocation = location.state?.location || "Remote";

  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const inferredRoles = useMemo(() => getInferredRoles(jobs), [jobs]);

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    if (!file) return;

    let active = true;

    const uploadAndFetch = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("location", selectedLocation);

        const res = await fetch(`${apiBaseUrl}/api/resume/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Resume upload failed");

        const resumeData = await res.json();

        const extractedSkills = Array.isArray(resumeData.skills)
          ? resumeData.skills
          : typeof resumeData.skills === "string"
          ? resumeData.skills
              .split(/,|\n/g)
              .map((s) => s.trim())
              .filter(Boolean)
          : [];

        if (!active) return;
        setSkills(extractedSkills);

        const initialRecs = Array.isArray(resumeData.recommendations)
          ? resumeData.recommendations
          : [];

        if (initialRecs.length > 0) {
          setJobs(initialRecs);
        } else if (extractedSkills.length > 0) {
          const jobsRes = await fetch(
            `${apiBaseUrl}/api/recommendations/live`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                resumeSkills: extractedSkills,
                location: selectedLocation,
              }),
            }
          );

          if (!jobsRes.ok) throw new Error("Job fetch failed");

          const jobsData = await jobsRes.json();
          setJobs(
            Array.isArray(jobsData.recommendations)
              ? jobsData.recommendations
              : []
          );
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong while analyzing your resume");
      } finally {
        if (active) setLoading(false);
      }
    };

    uploadAndFetch();

    return () => {
      active = false;
    };
  }, [file]);

  if (!file) {
    return (
      <section className="min-h-screen bg-black text-white px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">
            Upload a resume to see results
          </h1>
          <p className="text-gray-400 mb-8">
            We need a resume file to extract skills and recommend roles.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Go to Upload
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      {loading && (
        <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-black">
            <div className="mx-auto h-16 w-16 rounded-full border-4 border-black/20 border-t-black animate-spin" />
            <p className="mt-4 text-gray-700">
              Analyzing your resume & matching jobs...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Resume Insights
          </h1>
          <Link
            to="/dashboard"
            className="text-sm text-white/70 hover:text-white"
          >
            Upload another resume
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Extracted Skills</h2>
          {skills.length === 0 ? (
            <p className="text-gray-400">No skills detected yet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="px-4 py-2 bg-gray-800 rounded-full text-sm text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Inferred Job Roles</h2>
          {inferredRoles.length === 0 ? (
            <p className="text-gray-400">No inferred roles yet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {inferredRoles.map((role) => (
                <span
                  key={role}
                  className="px-4 py-2 bg-white/10 rounded-full text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Recommended Jobs</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-400">No job recommendations yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job, i) => (
                <JobCard key={`${job.title}-${i}`} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Results;
