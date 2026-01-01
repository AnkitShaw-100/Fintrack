import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://finora-backend-red.vercel.app/"
      : "http://localhost:5000",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fintrack_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Redirect to login on 401 (invalid/expired token). Components will receive
// an error object with `isAuthRedirect` and should avoid showing auth errors.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("fintrack_token");
      } catch (e) {
        // ignore
      }
      // Use replace so user can't go back to the protected page
      if (typeof window !== "undefined") window.location.replace("/login");
      return Promise.reject({ isAuthRedirect: true });
    }
    return Promise.reject(error);
  }
);

export default API;
