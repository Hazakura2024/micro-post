import axios from "axios";
import type { AuthResponse } from "../types/Auth";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL;



const useAxiosIntercepter = () => {

    // const token = useAuthStore((state) => state.userInfo.token);
    const setUserInfo = useAuthStore((state) => state.setUserInfo);
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    const refreshPromiseRef = useRef<Promise<string> | null>(null)

    useEffect(() => {
        // NOTE: access_tokenを自動でheaderに設定する処理
        const requestInterceptor = apiClient.interceptors.request.use(
            (config) => {

                const isPublic =
                    config.url === "/auth" ||
                    config.url === "/auth/refresh" ||
                    config.url === "/user/create";

                if (!isPublic) {

                    const latestToken = useAuthStore.getState().userInfo.token;
                    const headers = axios.AxiosHeaders.from(config.headers)
                    if (!headers.get("Authorization")) {
                        headers.set("Authorization", "Bearer " + latestToken)
                        config.headers = headers;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error),
        )

        NOTE: access_token期限切れ時に一度だけrefreshAuthを飛ばす処理
        const responseIntercepter = apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {

                const originalRequest = error.config;

                if (error.response?.status === 401
                    && !originalRequest._retry
                    && originalRequest.url !== '/auth'
                    && originalRequest.url !== '/auth/refresh'
                    && originalRequest.url !== '/user/create'
                ) {
                    originalRequest._retry = true;

                    try {

                        if (!refreshPromiseRef.current) {
                            refreshPromiseRef.current = apiClient.post<AuthResponse>("/auth/refresh")
                                .then((res) => {
                                    const newToken = res.data.token;
                                    useAuthStore.getState().setUserInfo({ token: newToken });
                                    return newToken;
                                })
                                .finally(() => {
                                    refreshPromiseRef.current = null;
                                });
                        }
                        const newToken = await refreshPromiseRef.current;
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return apiClient(originalRequest)

                    } catch (error) {
                        await initializeAuth();
                        // (学習メモ): throw errorと同じだが、axiosの公式ドキュメントではこっちで書いている
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        )
        return () => {
            apiClient.interceptors.request.eject(requestInterceptor);
            apiClient.interceptors.response.eject(responseIntercepter);
        }
    }, [setUserInfo, initializeAuth])
}

