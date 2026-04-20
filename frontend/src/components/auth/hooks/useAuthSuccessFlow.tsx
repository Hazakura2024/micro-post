import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export const useAuthSuccessFlow = () => {

    const navigate = useNavigate();


    const setUserInfo = useAuthStore((state) => state.setUserInfo);
    const saveInfoWithName = useAuthStore((state) => state.saveInfoWithName)

    const handleAuthSuccess = useCallback(async (token: string) => {


        setUserInfo({ token: token })
        console.log("useSuccessFlowです")
        console.log(useAuthStore.getState().userInfo.token);
        await saveInfoWithName();
        navigate("/main");
    },
        [navigate, saveInfoWithName, setUserInfo]
    )

    return { handleAuthSuccess }
}

