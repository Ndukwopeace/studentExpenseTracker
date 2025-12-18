import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
});

/* Attach token to every request */
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* 🔥 AUTO LOGOUT ON TOKEN ERROR */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 422) {
            console.warn("Token expired or invalid. Logging out.");

            localStorage.removeItem("token");

            // Force redirect (no React state issues)
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;
