import { useState, useContext } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Lock as LockIcon, Email as EmailIcon } from "@mui/icons-material";
import { UserContext } from "../context/UserContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
    rememberMe: false
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setUser] = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", {
        email: formData.email,
        password: formData.password
      });

      // Save token and user data
      localStorage.setItem("fintrack_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user); // Store user in context

      if (formData.rememberMe) {
        localStorage.setItem("rememberEmail", formData.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      navigate("/dashboard");
    } catch (err) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong during login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen pt-18 items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <LockIcon style={{ color: '#00a63e', fontSize: 50 }} />
          <h2 className="mt-2 text-3xl font-bold text-gray-600">Welcome Back</h2>
          <p className="mt-1 text-gray-600">Log in to continue to your account</p>
        </div>

        {error && (
          <div className="mb-3 rounded bg-red-100 px-4 py-2 text-red-600 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 text-gray-600 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
              <EmailIcon fontSize="small" />
            </span>
          </div>

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
              <LockIcon fontSize="small" />
            </span>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 focus:outline-none"
              onClick={handleClickShowPassword}
            >
              {formData.showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="accent-green-600"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-1"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          <div className="my-3 flex items-center">
            <div className="flex-1 border-t border-gray-300" />
            <span className="mx-2 text-gray-400 text-xs">OR</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>

          <div className="text-center mt-2">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-600 hover:underline">
                Sign up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
