import { useLogout } from "../../../hooks/useLogout";


export const useLogoutButton = () => {
    const { logout, isLoggingOut } = useLogout();

    const onClickLogout = () => logout();

    return { onClickLogout, isLoggingOut };
}