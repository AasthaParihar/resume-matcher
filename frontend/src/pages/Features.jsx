import { Link } from "react-router-dom";

const FEATURES = [
  {
    title: "Upload Your Resume",
    description:
      "Drop a PDF or DOCX and we parse the content to build a structured skills profile in seconds.",
  },
  {
    title: "Skill Extraction",
    description:
      "We identify hard and soft skills, tools, and domains so your profile reflects what you can really do.",
  },
  {
    title: "Keywords & Job Roles",
    description:
      "Get recommended keywords and role matches based on your skills to strengthen applications.",
  },
  {
    title: "Real-Time Job Openings",
    description:
      "See live openings matched to your resume so you can focus on roles that fit now.",
  },
];

const Features = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-10 md:p-14">
          <div className="absolute -top-28 -right-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              CareerPath Features
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              A focused toolkit that turns resumes into real opportunities
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-lg">
              Everything you need to understand your skills, surface the right
              roles, and act quickly on the best matches.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div>
            <p className="text-xl font-semibold">Ready to see your matches?</p>
            <p className="text-white/70">
              Upload a resume and get tailored roles in minutes.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="bg-white text-black px-6 py-3 rounded text-base hover:bg-gray-200 transition"
          >
            Start With Your Resume
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
