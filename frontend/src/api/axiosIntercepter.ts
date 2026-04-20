import axios from "axios";

import { useAuthStore } from "../store/useAuthStore";

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

            const token = useAuthStore.getState().userInfo.token;
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

    // NOTE: access_token期限切れ時に一度だけrefreshAuthを飛ばす処理
    const responseIntercepter = apiClient.interceptors.response.use(
        (response) => response,
        async (error) => {

            return Promise.reject(error);
        }
    )
    return () => {
        apiClient.interceptors.request.eject(requestInterceptor);
        apiClient.interceptors.response.eject(responseIntercepter);
    }

}

