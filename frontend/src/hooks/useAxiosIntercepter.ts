import axios from "axios";
import type { AuthResponse } from "../types/Auth";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const useAxiosIntercepter = () => {
    // const { userInfo, setUserInfo } = useContext(UserContext);

    // const tokenRef = useRef(userInfo.token);


    const token = useAuthStore((state) => state.userInfo.token);
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

                if (!isPublic && token) {
                    const headers = axios.AxiosHeaders.from(config.headers)
                    if (!headers.get("Authorization")) {
                        headers.set("Authorization", "Bearer " + token)
                        config.headers = headers;
                    }
                }
                return config;
            },
            (error) => Promise.reject(error),
        )

        // NOTE: access_token期限切れ時に一度だけrefreshAuthを飛ばす処理
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
                        /** 
                        if (!refreshPromiseRef.current)
                        まだ refresh 中ではないなら、refresh を始めるという判定です

                        refreshPromiseRef.current = apiClient.post("/auth/refresh")...
                        refresh の処理そのものを Promise として保存しています。
                        これで「今走っている refresh の結果」を他の処理も共有できます

                        .then((res) => { ... })
                        refresh が成功したら、新しい token を取り出して setUserInfo({ token: newToken }) で Store を更新します。
                        ここで更新しておくと、次のリクエストから新 token を使えます

                        return newToken
                        Promise の最終的な結果を token 文字列にしています。
                        だから後で await refreshPromiseRef.current した側は、新 token を受け取れます

                        .finally(() => { refreshPromiseRef.current = null; })
                        成功しても失敗しても、refresh 中フラグを必ず解除します。
                        これがないと、二度と refresh できなくなります
                        */
                        if (!refreshPromiseRef.current) {
                            refreshPromiseRef.current = apiClient.post<AuthResponse>("/auth/refresh")
                                .then((res) => {
                                    const newToken = res.data.token;
                                    setUserInfo({ token: newToken });
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
    }, [token, setUserInfo, initializeAuth])
}

