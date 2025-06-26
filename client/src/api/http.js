import axios from "axios";
import { useAuthStore } from "../store/authStore";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem("refreshToken");
    if (error.response.status === 401) {
      if (token) {
        http
          .post("/auth/refresh-token", {
            headers: {
              "x-refresh-token": token,
            }
          })
          .then((res) => {
            localStorage.setItem("accessToken", res.data.metadata.tokens.accessToken);
            localStorage.setItem("refreshToken", res.data.metadata.tokens.refreshToken);
            localStorage.setItem("user", JSON.stringify(res.data.metadata.user));
            return http(error.config);
          });
      }
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default http;
