import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/Auth";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const clearToken = useAuthStore((state) => state.clearToken);
    const navigate = useNavigate();

    const LogoutMutation = useMutation({
        mutationFn: logout,

        onSuccess: () => {
            clearToken();

            queryClient.clear();

            navigate("/");
        },

        onError: () => {
            clearToken();
            queryClient.clear();
            navigate("/");
        }    
    });

    return {
        logout: LogoutMutation.mutate,
        isLoggingOut: LogoutMutation.isPending,
    }
}