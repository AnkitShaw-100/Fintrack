import axios from "axios";

const API = axios.create({
  baseURL: "https://fintrack-backend-olive.vercel.app",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("fintrack_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;
