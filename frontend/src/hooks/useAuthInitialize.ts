import { useEffect, useState } from "react"
import { apiClient } from "../api/axiosIntercepter";
import { useAuthStore } from "../store/useAuthStore";

let hasRunAuthInit = false;

export const useAuthInitialize = () => {
    const [isInitialized, setIsInitialized] = useState(false);

    const setToken = useAuthStore((state) => state.setToken)
    const clearToken = useAuthStore((state) => state.clearToken)

    useEffect(() => {
        const init = async () => {
                if (hasRunAuthInit) {
                  setIsInitialized(true);
                  return;
                }
    hasRunAuthInit = true;

            try {
                const res = await apiClient.post('/auth/refresh');
                if (res.data.token) {
                    setToken(res.data.token);
                }
            } catch (error) {
                clearToken();
            } finally {
                setIsInitialized(true);
            }
        }
        init();
    }, [setToken, clearToken]);

    return { isInitialized };
}