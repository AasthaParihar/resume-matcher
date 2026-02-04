import { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud } from "react-icons/fi";

const ResumeUploader = ({ onUpload }) => {
  const [location, setLocation] = useState("Remote");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 border-dashed border-gray-600 rounded-xl p-10 text-center bg-black"
    >
      <FiUploadCloud className="text-5xl mx-auto mb-4 text-gray-300" />

      <h3 className="text-xl font-semibold mb-2">
        Upload your resume
      </h3>

      <p className="text-gray-400 mb-6">
        PDF or DOCX • Drag & drop or click to upload
      </p>

      <div className="max-w-xs mx-auto mb-6">
        <label className="block text-left text-sm text-gray-400 mb-2">
          Preferred location
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-gray-900 text-white border border-gray-700 rounded px-3 py-2"
        >
          <option>Remote</option>
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>India</option>
          <option>Australia</option>
        </select>
      </div>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        id="resume-upload"
        onChange={(e) => onUpload(e.target.files[0], location)}

      />

      <label
        htmlFor="resume-upload"
        className="inline-block bg-white text-black px-6 py-3 rounded cursor-pointer hover:bg-gray-200 transition"
      >
        Choose Resume
      </label>
    </motion.div>
  );
};

export default ResumeUploader;
