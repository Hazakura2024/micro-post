import React, { useContext, useState } from "react";
import signIn from "../api/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import styled from "styled-components";

const SignUp = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const { setUserInfo } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");

    const onSignClick = async () => {
        try {
            setErrorMessage("");
            const ret = await signIn(userId, pass);
            if (ret?.token) {
                setUserInfo({
                    id: ret.user_id,
                    token: ret.token,
                });
                navigate("/main");
            }
        } catch (error: unknown) {
            const msg =
                error instanceof Error ? error.message : "ログインに失敗しました";
            setErrorMessage(msg);
        }
    };

    return (
        <SSignUpFrame>
            <SSignUpRow>
                <h3>登録</h3>
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
                        type="text"
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
                        type="text"
                        onChange={(evt) => setPass(evt.target.value)}
                    />
                </SSignUpInput>
            </SSignUpRow>
            <SSignUpRow>
                {errorMessage && (
                    <SErrorMessage>ログインできませんでした</SErrorMessage>
                )}
            </SSignUpRow>
            <SSignUpRow>
                <SSignUpButton type="button" onClick={onSignClick}>
                    Login
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
  dispaly: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SSignUpButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;

const SErrorMessage = styled.div`
  color: red;
`;
