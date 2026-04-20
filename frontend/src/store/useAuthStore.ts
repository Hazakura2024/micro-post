import { create } from "zustand";
import type { UserInfo } from "../types/User";

import { getUser } from "../api/User";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";
import { logout } from "../api/Auth";
import { apiClient } from "../api/axiosIntercepter";

interface AuthState {
    userInfo: UserInfo;
    authLoading: boolean;

    setUserInfo: (info: Partial<UserInfo>) => void;
    setAuthLoading: (isLoading: boolean) => void;
    logout: () => void;
    initializeAuth: () => Promise<void>;
    saveInfoWithName: () => Promise<void>
}

const initialUserInfo: UserInfo = {
    id: 0,
    name: "",
    icon_path: null,
    token: "",
}

export const useAuthStore = create<AuthState>((set) => ({
    userInfo: initialUserInfo,
    authLoading: true,

    setUserInfo: (info) =>
        set((state) => ({
            userInfo: { ...state.userInfo, ...info }
        })),

    setAuthLoading: (isLoading) =>
        set({ authLoading: isLoading }),

    logout: async () => {
        await logout()
        set({ userInfo: initialUserInfo })
    },

    initializeAuth: async () => {
        set({ authLoading: true })
        try {
            const res = await apiClient.post('/auth/refresh');
            set((state) => ({
                userInfo: {
                    ...state.userInfo,
                    token: res.data.token,
                }
            }))
            const user = await getUser();
            set((state) => ({
                userInfo: {
                    ...state.userInfo,
                    id: user.id,
                    name: user.name,
                    icon_path: user.icon_path,
                }
            }))

        } catch {
            set({ userInfo: initialUserInfo });
        } finally {
            set({ authLoading: false })
        }
    },

    saveInfoWithName: async () => {
        try {
            const user = await getUser();
            set((state) => ({
                userInfo: {
                    ...state.userInfo,
                    id: user.id,
                    name: user.name,
                    icon_path: user.icon_path,
                },
            }));
        } catch (error: unknown) {
            const msg = extractErrorMessage(error, "ユーザー情報が取得できません");
            toast.error(msg);
            set(state => ({
                userInfo: {
                    ...state.userInfo,
                    id: 0,
                    name: "",
                    icon_path: "",
                },
            }));
            throw error;
        }
    }

}));