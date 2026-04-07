import { useContext, useState } from "react";
import { signIn } from "../../../api/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { UserContext } from "../../../contexts/UserContext";
import { apiClient } from "../../../hooks/useAxiosIntercepter";
import { useAuthCommon } from "./useAuthCommon";


export const useSignIn = () => {

    const { } = useAuthCommon();

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const { setUserInfo, saveInfoWithName } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSignClick = async () => {
        setIsSubmitting(true);
        try {
            setErrorMessage("");
            const ret = await signIn(userId, pass);
            if (!ret?.token) {
                toast.error("ログインに失敗しました");
                return;
            }
            apiClient.defaults.headers.common.Authorization = "Bearer " + ret.token;

            setUserInfo(prev => ({
                ...prev,
                token: ret.token,
            }))
            await saveInfoWithName(ret.user_id);
            navigate("/main");
        } catch (error: unknown) {
            const msg = extractErrorMessage(error, "ログインできません");
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        userId,
        setUserId,
        pass,
        setPass,
        errorMessage,
        isSubmitting,
        onSignClick,
    }

}