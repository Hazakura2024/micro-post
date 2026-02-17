import React, { useContext, useState } from "react";
import signIn from "../api/Auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import styled from "styled-components";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
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
      const msg = error instanceof Error ? error.message : "ログインに失敗しました";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <SSignInFrame>
      <SSignInRow>
        <h3>ログイン</h3>
      </SSignInRow>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="id">ID</label>
        </SSignInLabel>
        <SSignInInput>
          <input
            id="id"
            value={userId}
            type="text"
            onChange={(evt) => setUserId(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>
      <SSignInRow>
        <SSignInLabel>
          <label htmlFor="password">Password</label>
        </SSignInLabel>
        <SSignInInput>
          <input
            id="password"
            value={pass}
            type="text"
            onChange={(evt) => setPass(evt.target.value)}
          />
        </SSignInInput>
      </SSignInRow>
      <SSignInRow>
        {errorMessage && (
          <SErrorMessage>ログインできませんでした</SErrorMessage>
        )}
      </SSignInRow>
      <SSignInRow>
        <SSignInButton type="button" onClick={onSignClick}>
          Login
        </SSignInButton>
      </SSignInRow>
    </SSignInFrame>
  );
};

export default SignIn;

const SSignInFrame = styled.div`
  background-color: #f8f8f8;
  max-width: 600px;
  margin: 80px auto;
  padding-top: 20px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  display: block;
  text-align: center;
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SSignInLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SSignInInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SSignInButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;

const SErrorMessage = styled.div`
  color: red;
`;
