import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-black text-white z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          CareerPath
        </Link>

        <div className="flex items-center space-x-6 text-sm">
          <Link to="/dashboard" className="hover:opacity-80">
            Dashboard
          </Link>
          <Link to="/features" className="hover:opacity-80">
            Features
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
