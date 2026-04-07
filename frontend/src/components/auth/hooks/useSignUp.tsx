import { useContext, useState } from "react";
import { signIn } from "../../../api/Auth";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../../utils/extractErrorMessage";
import { UserContext } from "../../../contexts/UserContext";
import { apiClient } from "../../../hooks/useAxiosIntercepter";
import { useAuthCommon } from "./useAuthCommon";

export const useSignUp = () => {

    const { } = useAuthCommon();

    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const { setUserInfo, saveInfoWithName } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSignClick = async () => {
        // (学習メモ): フロントエンド側にも入力バリデーションを追加すべき
        // (学習メモ): .trim()は空白や改行文字を取り除いたものを返す
        if (!userId.trim() || !pass.trim() || !mail.trim()) {
            toast.error("すべてのフィールドを入力してください");
            return;
        }

        // (学習メモ): /^...$/正規表現
        // (学習メモ): 正規表現.test(文字列) この文字列から検索
        // (学習メモ): [^...]  ...の否定
        // (学習メモ): [^\s@]+\s(空白)か@以外の文字1文字以上
        // (学習メモ): @  @が入る
        // (学習メモ): \..が入る
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            toast.error("正しいメールアドレスを入力してください");
            return;
        }

        if (pass.length < 6) {
            toast.error("パスワードは6文字以上です");
            return;
        }

        setIsSubmitting(true);
        try {
            setErrorMessage("");

            await createUser(userId, mail, pass);

            const ret = await signIn(userId, pass);
            apiClient.defaults.headers.common.Authorization = "Bearer " + ret.token;
            if (ret?.token) {
                setUserInfo(prev => ({
                    ...prev,
                    token: ret.token,
                }))
                await saveInfoWithName(ret.user_id);

                navigate("/main");
            }
        } catch (error: unknown) {
            const msg = extractErrorMessage(error, "登録に失敗しました。");
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        userId,
        setUserId,
        mail,
        setMail,
        pass,
        setPass,
        errorMessage,
        isSubmitting,
        onSignClick,
    }
}