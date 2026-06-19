import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { toast } from 'react-toastify';

export const useAuthSuccessFlow = () => {

    const navigate = useNavigate();


    const setToken = useAuthStore((state) => state.setToken);

    const handleAuthSuccess = useCallback(async (token: string) => {

        setToken(token);

        navigate("/main");
        toast.success("ログインに成功しました！")
    },
        [navigate, setToken]
    )

    return { handleAuthSuccess }
}

