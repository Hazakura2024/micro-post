import { useCallback, useContext } from 'react'
import { apiClient } from '../../../hooks/useAxiosIntercepter';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export const useAuthSuccessFlow = () => {

    const navigate = useNavigate();

    const { setUserInfo, saveInfoWithName } = useContext(UserContext);

    const handleAuthSuccess = useCallback(async (token: string, userId: number) => {
        apiClient.defaults.headers.common.Authorization = "Bearer " + token;

        setUserInfo(prev => ({
            ...prev,
            token,
        }))
        await saveInfoWithName(userId);
        navigate("/main");
    },
        [navigate, saveInfoWithName, setUserInfo]
    )

    return { handleAuthSuccess }
}

