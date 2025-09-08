import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";

const Navbar = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("fintrack_token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-white transition hover:text-green-100"
        >
          FinTrack
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="text-white transition hover:text-green-200"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-white transition hover:text-green-200"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-white transition hover:text-green-200"
          >
            Profile
          </Link>
          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-lg bg-white px-3 py-1 text-green-600 shadow-sm transition hover:bg-green-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-lg bg-white px-3 py-1 text-green-600 shadow-sm border border-green-600 transition hover:bg-green-50 hover:text-green-700 font-semibold"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-lg bg-white px-3 py-1 text-green-600 shadow-sm border border-green-600 transition hover:bg-green-50 hover:text-green-700 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
