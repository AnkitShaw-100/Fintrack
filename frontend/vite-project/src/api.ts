import axios from "axios";

const API = axios.create({
    baseURL: "https://fintrack-backend-olive.vercel.app/",
});


API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        if (!config.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
