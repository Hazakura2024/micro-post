import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { toast } from 'react-toastify';

export const useAuthSuccessFlow = () => {

    const navigate = useNavigate();


    const setUserInfo = useAuthStore((state) => state.setUserInfo);
    const saveInfoWithName = useAuthStore((state) => state.saveInfoWithName)

    const handleAuthSuccess = useCallback(async (token: string) => {


        setUserInfo({ token: token })
        await saveInfoWithName();
        navigate("/main");
        toast.success("ログインに成功しました！")
    },
        [navigate, saveInfoWithName, setUserInfo]
    )

    return { handleAuthSuccess }
}

