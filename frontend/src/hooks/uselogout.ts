import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore"
import { logout } from "../api/Auth";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const clearToken = useAuthStore((state) => state.clearToken);
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            clearToken();
            queryClient.clear();
            navigate("/login")
        },
        onError: () => {
            clearToken();
            queryClient.clear();
            navigate("/login");
        }
    });

    return {
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending
    }
}