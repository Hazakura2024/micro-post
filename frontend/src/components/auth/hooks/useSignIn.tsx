import { useState } from "react";
import { signIn } from "../../../api/Auth";
import { toast } from "react-toastify";
import { useAuthError } from "./useAuthError";
import { useAuthSuccessFlow } from "./useAuthSuccessFlow";


export const useSignIn = () => {


    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleAuthError } = useAuthError(setErrorMessage);
    const { handleAuthSuccess } = useAuthSuccessFlow()

    const onSignClick = async () => {
        if (!userId.trim() || !pass.trim()) {
            toast.error("すべてのフィールドを入力してください");
            return;
        }
        if (pass.length < 6) {
            toast.error("パスワードは6文字以上です");
            return;
        }

        setIsSubmitting(true);
        try {
            setErrorMessage("");
            const ret = await signIn(userId, pass);
            if (!ret?.token) {
                toast.error("ログインに失敗しました");
                return;
            }
            handleAuthSuccess(ret.token, ret.user_id)
        } catch (error: unknown) {
            handleAuthError(error, "ログインできませんでした。")
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