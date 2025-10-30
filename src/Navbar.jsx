import { useState } from "react";
import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import userimg from "./assets/userimg.jpg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-semibold">MediDash</h1>
          <nav className="hidden sm:flex text-sm">
            <Link to="/" className="mr-3 py-2 rounded hover:bg-gray-100">
              Dashboard
            </Link>
            <Link
              to="/Reception"
              className="mr-3 py-2 rounded hover:bg-gray-100"
            >
              Reception
            </Link>
            <Link to="/doctor" className="py-2 rounded hover:bg-gray-100">
              Doctor
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2">
            <img src={userimg} alt="user" className="w-8 h-8 rounded-full" />
            <div className="text-sm">Dr. Smith</div>
          </div>

          <button
            className="sm:hidden p-2 hover:bg-gray-100 rounded"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <CiMenuBurger />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white border-t shadow-md">
          <nav className="flex flex-col text-sm">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <Link
              to="/Reception"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Reception
            </Link>
            <Link
              to="/doctor"
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Doctor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
