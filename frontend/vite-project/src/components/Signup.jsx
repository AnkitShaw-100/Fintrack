import { useState } from "react";
import API from "../api/index.js";
import { useNavigate, Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-600">Create an Account</h2>
          <p className="mt-1 text-gray-600">Join our community today</p>
        </div>

        {error && (
          <div className="mb-3 rounded bg-red-100 px-4 py-2 text-red-600 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-3 rounded bg-green-100 px-4 py-2 text-green-600 text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-600 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-600 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-600 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
              type={formData.showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
              <Visibility fontSize="small" />
            </span>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 focus:outline-none"
              onClick={handleClickShowPassword}
            >
              {formData.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="my-3 flex items-center">
            <div className="flex-1 border-t border-gray-300" />
            <span className="mx-2 text-gray-400 text-xs">OR</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline">
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
