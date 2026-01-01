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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("fintrack_token");
      } catch (error) {
        console.log(error);
      }
      if (typeof window !== "undefined") window.location.replace("/login");
      return Promise.reject({ isAuthRedirect: true });
    }
    return Promise.reject(error);
  }
);

export default API;
