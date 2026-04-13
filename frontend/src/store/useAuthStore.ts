import { create } from "zustand";
import type { UserInfo } from "../types/User";

interface AuthState {
    userInfo: UserInfo;
    authLoading: boolean;

    setUserInfo: (info: Partial<UserInfo>) => void;
    setAuthLoading: (isLoading: boolean) => void;
    logout: () => void;
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

    logout: () =>
        set({ userInfo: initialUserInfo }),

}));