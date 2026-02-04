import { motion } from "framer-motion";

const Processing = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-10 text-center"
    >
      <motion.div
        className="h-1 bg-white mx-auto rounded"
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <p className="mt-4 text-gray-400">
        Analyzing your resume & matching jobs...
      </p>
    </motion.div>
  );
};

export default Processing;
