import axios from "axios";
import type { AuthResponse } from "../types/Auth";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";



const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const useAxiosIntercepter = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);

    const tokenRef = useRef(userInfo.token);
    useEffect(() => {
        tokenRef.current = userInfo.token;
    }, [userInfo.token])


    useEffect(() => {
        // NOTE: access_tokenを自動でheaderに設定する処理
        const requestInterceptor = apiClient.interceptors.request.use(
            (config) => {

                const isPublic =
                    config.url === "/auth" ||
                    config.url === "/auth/refresh" ||
                    config.url === "/user/create";

                if (!isPublic) {
                    const headers = axios.AxiosHeaders.from(config.headers)
                    const already = headers.get("Authorization");
                    if (already) {
                        config.headers = headers;
                        return config;
                    }

                    if (tokenRef.current) {
                        headers.set("Authorization", "Bearer " + tokenRef.current)
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
                        const res = await apiClient.post<AuthResponse>('/auth/refresh')
                        console.log('refreshされました。')
                        const newAccessToken = res.data.token;
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                        apiClient.defaults.headers.common.Authorization = "Bearer " + newAccessToken;
                        tokenRef.current = newAccessToken;

                        setUserInfo(prev => ({
                            ...prev,
                            token: newAccessToken,
                        }));



                        return apiClient(originalRequest)

                    } catch (error) {
                        setUserInfo({
                            id: 0,
                            name: "",
                            icon_path: null,
                            token: "",
                        });
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
    }, [userInfo.token, setUserInfo])
}

