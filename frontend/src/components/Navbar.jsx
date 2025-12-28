import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import API from "../api.js";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout request failed:", err);
    }

    try {
      localStorage.removeItem("fintrack_token");
    } catch {
      console.error("Failed to remove token from localStorage.");
    }

    setUser(null);
    navigate("/login");
  };

  const [open, setOpen] = useState(false);
  const accent = "#b5f277"; // updated neon green accent
  const muted = "#cfd6d2"; // muted text

  // Nav item helper to provide hover color transition without relying on inline :hover
  const NavItem = ({ to, children, className = "text-base" }) => {
    const [hover, setHover] = useState(false);
    return (
      <Link
        to={to}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          color: hover ? accent : muted,
          transition: "color 150ms ease",
        }}
        className={className}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="absolute top-4 left-0 right-0 z-40 pointer-events-auto">
      <div className="mx-auto px-4">
        <div
          className="mx-auto max-w-4xl rounded-full px-6 py-3 flex items-center justify-between backdrop-blur-md"
          style={{
            background:
              "linear-gradient(90deg, rgba(43,15,255,0.08) 0%, rgba(122,255,103,0.06) 50%, rgba(14,165,184,0.04) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 6px 30px rgba(2,6,23,0.6)",
          }}
        >
          <Link to="/dashboard" className="flex items-center gap-3">
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span style={{ color: accent, fontWeight: 800, fontSize: 18 }}>
                F
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-white md:text-lg">Finora</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavItem to="/" className="text-base font-semibold">
              Home
            </NavItem>
            <NavItem to="/dashboard" className="text-base font-semibold">
              Dashboard
            </NavItem>
            <NavItem to="/docs" className="text-base font-semibold">
              Docs
            </NavItem>
            {user && (
              <NavItem to="/profile" className="text-base font-semibold">
                Profile
              </NavItem>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ border: `1px solid ${accent}`, color: accent }}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-semibold"
                  style={{ background: accent, color: "#07100a" }}
                >
                  Login
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ border: `1px solid ${accent}`, color: accent }}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-1 rounded-md text-white"
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (simple dropdown) */}
      {open && (
        <div className="mt-3 mx-auto max-w-4xl px-4">
          <div className="rounded-xl bg-[#0b0f12] p-3 border border-[#111318]">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="text-gray-300"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-gray-300"
              >
                Dashboard
              </Link>
              {user && (
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="text-gray-300"
                >
                  Profile
                </Link>
              )}
              <Link
                to="/docs"
                onClick={() => setOpen(false)}
                className="text-gray-300"
              >
                Docs
              </Link>
              {!user ? (
                <div className="flex gap-2 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-2 rounded bg-[#b5f277] text-black"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-2 rounded border border-[#b5f277] text-[#b5f277]"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left py-2 rounded border border-[#111318] text-gray-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
