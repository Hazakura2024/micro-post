import styled from "styled-components";
import { useSignIn } from "./hooks/useSignIn";

const SignIn = () => {

  const {
    userId,
    setUserId,
    pass,
    setPass,
    errorMessage,
    isSubmitting,
    onSignClick,
  } = useSignIn()

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
            type="password"
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
        <SSignInButton
          disabled={isSubmitting}
          type="button"
          onClick={onSignClick}
        >
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
  &:disabled {
    background-color: #c1c1c1;
    cursor: not-allowed;
  }
`;

const SErrorMessage = styled.div`
  color: red;
`;
