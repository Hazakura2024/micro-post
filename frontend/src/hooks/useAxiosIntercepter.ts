import axios from "axios";
import type { AuthResponse } from "../types/Auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";



const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

export const useAxiosIntercepter = () => {
    const { setUserInfo } = useContext(UserContext);

    useEffect(() => {
        const responseIntercepter = apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {

                const originalRequest = error.config;

                if (error.response?.status === 401
                    && !originalRequest._retry
                    && originalRequest.url !== '/auth'
                    && originalRequest.url !== '/auth/refresh'
                ) {
                    originalRequest._retry = true;

                    try {
                        const res = await apiClient.post<AuthResponse>('/auth/refresh')
                        const newAccessToken = res.data.token;

                        setUserInfo(prev => ({
                            ...prev,
                            token: newAccessToken,
                        }));

                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                        return apiClient(originalRequest)

                    } catch (error) {
                        setUserInfo({
                            id: 0,
                            name: "",
                            icon_path: null,
                            token: "",
                        });
                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        )
        return () => {
            apiClient.interceptors.response.eject(responseIntercepter);
        }
    }, [setUserInfo])
}

