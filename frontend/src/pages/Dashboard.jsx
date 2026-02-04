import { useNavigate } from "react-router-dom";
import ResumeUploader from "../components/upload/ResumeUploader";
import Reveal from "../components/Reveal";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUpload = (file, location) => {
    if (!file) return;
    navigate("/results", { state: { file, location } });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 text-white">
      <Reveal>
        <ResumeUploader onUpload={handleUpload} />
      </Reveal>
    </div>
  );
};

export default Dashboard;
