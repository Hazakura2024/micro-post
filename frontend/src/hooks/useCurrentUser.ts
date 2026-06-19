import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/User";
import { useAuthStore } from "../store/useAuthStore"

export const useCurrentUser = () => {
    const token = useAuthStore((state) => state.token);

    const {
        data: userInfo,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getUser,
        enabled: !!token,
        staleTime: 1000*60*5
    })

    return {
        userInfo,
        isLoading,
        isAuthenticated: !!token,
        error
    }
}