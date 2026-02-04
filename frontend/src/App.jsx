import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Results from "./pages/Results";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
