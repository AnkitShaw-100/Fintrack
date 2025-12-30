import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { Visibility, VisibilityOff, Email as EmailIcon, Person as PersonIcon, Lock as LockIcon } from "@mui/icons-material";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Input handling
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password toggle
  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  // Submit handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err && err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong during signup. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07090a] px-4">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-[#0b0f12] to-[#0f1416] p-8 shadow-2xl border border-[#111318] mt-10">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ color: '#b5f277', fontWeight: 800, fontSize: 28 }}>F</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Create an Account</h2>
          <p className="mt-1 text-gray-400">Join our community today</p>
        </div>

        {error && (
          <div className="mb-3 rounded bg-red-100/80 px-4 py-2 text-red-700 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-3 rounded bg-green-100/80 px-4 py-2 text-green-700 text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              className="w-full rounded-lg border border-[#23282c] bg-[#181f23] px-4 py-3 pl-10 text-gray-200  focus:border-[#b5f277] focus:outline-none focus:ring-2 focus:ring-[#b5f277]/30"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5f277]">
              <PersonIcon fontSize="small" />
            </span>
          </div>

          <div className="relative">
            <input
              className="w-full rounded-lg border border-[#23282c] bg-[#181f23] px-4 py-3 pl-10 text-gray-200  focus:border-[#b5f277] focus:outline-none focus:ring-2 focus:ring-[#b5f277]/30"
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5f277]">
              <EmailIcon fontSize="small" />
            </span>
          </div>

          <div className="relative">
            <input
              className="w-full rounded-lg border border-[#23282c] bg-[#181f23] px-4 py-3 pl-10 text-gray-200  focus:border-[#b5f277] focus:outline-none focus:ring-2 focus:ring-[#b5f277]/30"
              type={formData.showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b5f277]">
              <LockIcon fontSize="small" />
            </span>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5f277] focus:outline-none"
              onClick={handleClickShowPassword}
            >
              {formData.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#b5f277] px-4 py-3 font-semibold text-[#07100a] shadow-md transition hover:bg-[#a0e05e] focus:outline-none focus:ring-2 focus:ring-[#b5f277] focus:ring-offset-1"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="my-3 flex items-center">
            <div className="flex-1 border-t border-[#23282c]" />
            <span className="mx-2 text-[#b5f277]/60 text-xs">OR</span>
            <div className="flex-1 border-t border-[#23282c]" />
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-white">
              Already have an account ?{' '}
              <Link to="/login" className="text-[#b5f277] hover:underline">
                Log in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
