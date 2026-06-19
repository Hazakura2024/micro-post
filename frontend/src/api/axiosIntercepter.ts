import axios from "axios";

import { useAuthStore } from "../store/useAuthStore";
import type { AuthResponse } from "../types/Auth";

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const setupAxiosIntercepters = () => {

    // NOTE: access_tokenを自動でheaderに設定する処理
    const requestInterceptor = apiClient.interceptors.request.use(

        (config) => {
            const isPublic =
                config.url === "/auth" ||
                config.url === "/auth/refresh" ||
                config.url === "/user/create";
            if (isPublic) return config;

            const token = useAuthStore.getState().token;
            if (!token) return config;

            const headers = axios.AxiosHeaders.from(config.headers)
            if (!headers.get("Authorization")) {
                headers.set("Authorization", "Bearer " + token)
            }

            config.headers = headers;
            return config;
        },
        (error) => Promise.reject(error),
    )

    // 現在進行中の refresh 処理
    let refreshPromise: Promise<string> | null = null;

    // NOTE: access_token期限切れ時に一度だけrefreshAuthを飛ばす処理
    const responseIntercepter = apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status !== 401) return Promise.reject(error);

            if (!originalRequest || originalRequest._retry) return Promise.reject(error);

            const isPublic =
                originalRequest.url === "/auth" ||
                originalRequest.url === "/auth/refresh" ||
                originalRequest.url === "/user/create";
            if (isPublic) return Promise.reject(error);

            originalRequest._retry = true;

            try {
                // NOTE: refresh実行中なら何もしない
                if (!refreshPromise) {
                    refreshPromise = apiClient
                        .post<AuthResponse>("/auth/refresh")
                        .then((res) => {
                            const newToken = res.data.token;
                            useAuthStore.getState().setToken(newToken);
                            return newToken;
                        })
                        .finally(() => {
                            refreshPromise = null;
                        })
                }

                const newToken = await refreshPromise;

                const headers = axios.AxiosHeaders.from(originalRequest.headers);
                headers.set("Authorization", "Bearer " + newToken);
                originalRequest.headers = headers;

                return apiClient(originalRequest);
            } catch (error) {
                useAuthStore.getState().clearToken();
                return Promise.reject(error);
            }
        }
    )
    return () => {
        apiClient.interceptors.request.eject(requestInterceptor);
        apiClient.interceptors.response.eject(responseIntercepter);
    }

}

