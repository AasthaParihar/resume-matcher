import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Find jobs where <br /> your resume truly fits
        </h1>

        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Upload your resume and discover curated job opportunities
          ranked by how well they match your skills.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-black px-8 py-4 rounded text-lg hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </motion.div>
    </section>
  );
};

export default Home;
