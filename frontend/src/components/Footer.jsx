const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8 text-sm">
        <div>
          <h4 className="text-white font-semibold mb-4">CareerPath</h4>
          <p>AI-powered resume-based job matching.</p>
        </div>

        <div className="md:text-right">
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2">
            <li>Skill Extraction</li>
            <li>Keywords & Role Match</li>
            <li>Real-Time Job Openings</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-6">
        © 2025 CareerPath AI
      </div>
    </footer>
  );
};

export default Footer;
