import axios from "axios";
import { getRefreshToken, logout, setAuth } from "./authServices";
import { navigateTo } from "./navigationService"; // 

const api = axios.create({
    baseURL: "https://evaluateiteasily.runasp.net",
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        if (!(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    (error) => Promise.reject(error)
);



let isRefreshing = false;
let failedQueue = [];
const REFRESH_TOKEN_KEY = "refreshToken";

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = getRefreshToken(REFRESH_TOKEN_KEY);

                if (!refreshToken) {
                    logout();
                    navigateTo("/auth");
                    return Promise.reject(error);
                }

                const res = await axios.post(
                    "https://evaluateiteasily.runasp.net/Auth/refresh-token",
                    { refreshToken }
                );

                const newToken = res.data.accessToken;
                const newRefreshToken = res.data.refreshToken;

                if (!newToken) {
                    throw new Error("Invalid refresh response");
                }

                setAuth(
                    newToken,
                    localStorage.getItem("userRole"),
                    newRefreshToken
                );

                api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

                processQueue(null, newToken);

                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError, null);

                logout();
                navigateTo("/auth");

                return Promise.reject(refreshError);

            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;