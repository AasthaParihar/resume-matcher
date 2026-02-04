const SkillsPanel = ({ skills }) => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4 text-black">
        Your Skills
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-gray-800 rounded-full text-sm text-white"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsPanel;
