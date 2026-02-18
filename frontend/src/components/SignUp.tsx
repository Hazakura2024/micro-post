import React, { useContext, useState } from "react";
import signIn from "../api/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import styled from "styled-components";
import { createUser } from "../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const SignUp = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const { setUserInfo } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSignClick = async () => {

        // (学習メモ): フロントエンド側にも入力バリデーションを追加すべき
        // (学習メモ): .trim()は空白や改行文字を取り除いたものを返す
        if (!userId.trim() || !mail.trim() || !mail.trim()) {
            toast.error("すべてのフィールドを入力してください");
            return;
        }

        // (学習メモ): /^...$/正規表現
        // (学習メモ): 正規表現.test(文字列) この文字列から検索
        // (学習メモ): [^...]  ...の否定
        // (学習メモ): [^\s@]+　\s(空白)か@以外の文字1文字以上
        // (学習メモ): @  @が入る
        // (学習メモ): \.　.が入る
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
            toast.error('正しいメールアドレスを入力してください')
            return;
        }


        if (pass.length < 6) {
            toast.error('パスワードは6文字以上です');
            return;
        }

        setIsSubmitting(true);
        try {
            setErrorMessage("");

            await createUser(userId, mail, pass);

            const ret = await signIn(userId, pass);
            if (ret?.token) {
                setUserInfo({
                    id: ret.user_id,
                    token: ret.token,
                });
                navigate("/main");
            }
        } catch (error: unknown) {
            const msg = extractErrorMessage(error, "登録に失敗しました。");
            setErrorMessage(msg)
            toast.error(msg)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SSignUpFrame>
            <SSignUpRow>
                <h3>新規登録</h3>
            </SSignUpRow>
            <SSignUpRow>
                <SSignUpLabel>
                    <label htmlFor="id">ユーザー名</label>
                </SSignUpLabel>
                <SSignUpInput>
                    <input
                        id="id"
                        value={userId}
                        type="text"
                        onChange={(evt) => setUserId(evt.target.value)}
                    />
                </SSignUpInput>
            </SSignUpRow>
            <SSignUpRow>
                <SSignUpLabel>
                    <label htmlFor="id">メールアドレス</label>
                </SSignUpLabel>
                <SSignUpInput>
                    <input
                        id="id"
                        value={mail}
                        type="email"
                        onChange={(evt) => setMail(evt.target.value)}
                    />
                </SSignUpInput>
            </SSignUpRow>
            <SSignUpRow>
                <SSignUpLabel>
                    <label htmlFor="password">Password</label>
                </SSignUpLabel>
                <SSignUpInput>
                    <input
                        id="password"
                        value={pass}
                        type="password"
                        onChange={(evt) => setPass(evt.target.value)}
                    />
                </SSignUpInput>
            </SSignUpRow>
            <SSignUpRow>
                {errorMessage && (
                    <SErrorMessage>{errorMessage}</SErrorMessage>
                )}
            </SSignUpRow>
            <SSignUpRow>
                <SSignUpButton disabled={isSubmitting} type="button" onClick={onSignClick}>
                    SignUp
                </SSignUpButton>
            </SSignUpRow>
        </SSignUpFrame>
    );
};

export default SignUp;

const SSignUpFrame = styled.div`
  background-color: #f8f8f8;
  max-width: 600px;
  margin: 80px auto;
  padding-top: 20px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignUpRow = styled.div`
  display: block;
  text-align: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SSignUpLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SSignUpInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SSignUpButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  &:disabled {
    background-color: #c1c1c1;
    cursor: not-allowed;
  }
`;

const SErrorMessage = styled.div`
  color: red;
`;
