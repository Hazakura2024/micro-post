import { useState } from "react";
import { signIn } from "../../../api/Auth";
import { createUser } from "../../../api/User";
import { toast } from "react-toastify";
import { useAuthError } from "./useAuthError";
import { useAuthSuccessFlow } from "./useAuthSuccessFlow";

export const useSignUp = () => {

    const [userId, setUserId] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleAuthError } = useAuthError(setErrorMessage)
    const { handleAuthSuccess } = useAuthSuccessFlow()

    const onSignClick = async () => {

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

            // MEMO: ユーザー作成後、そのままログイン
            const ret = await signIn(userId, pass);

            if (!ret?.token) {
                toast.error("ログインに失敗しました");
                return;
            }
            handleAuthSuccess(ret.token, ret.user_id);

        } catch (error: unknown) {
            handleAuthError(error, "登録に失敗しました。")
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