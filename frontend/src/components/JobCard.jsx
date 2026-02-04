import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

const JobCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900 border border-gray-700 rounded-xl p-6"
    >
      <h4 className="text-lg font-semibold mb-1">
        {job.title}
      </h4>

      <p className="text-gray-400 text-sm mb-3">
        {job.company} • {job.location}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(job.matchedSkills || []).map((s, i) => (
          <span
            key={i}
            className="bg-gray-800 px-3 py-1 rounded-full text-xs"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Match Score: {job.score}%
        </span>

        <a
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm hover:opacity-80"
        >
          View Job <FiExternalLink />
        </a>
      </div>
    </motion.div>
  );
};

export default JobCard;
