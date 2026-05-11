import styled from "styled-components";
import { useSignIn } from "./hooks/useSignIn";

const SignIn = () => {

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  } = useSignIn()

  return (
    <SSignInFrame>
      <SForm onSubmit={handleSubmit}>
        <SSignInRow>
          <h3>ログイン</h3>
        </SSignInRow>
        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="userName">ユーザー名</label>
          </SSignInLabel>
          <SSignInInput>
            <input
              id="userName"
              type="text"
              {...register("userName")}
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
              type="password"
              {...register("password")}
            />
          </SSignInInput>
        </SSignInRow>
        <SSignInRow>
          {Object.values(errors).length > 0 && (
            <SErrorMessage>
              {/* rootがあればそれを、なければ最初に見つかったフィールドエラーの
        messageを表示する 
      */}
              {errors.root?.message || (Object.values(errors)[0] as any)?.message}
            </SErrorMessage>
          )}
        </SSignInRow>
        <SSignInRow>
          <SSignInButton
            disabled={isSubmitting}
            type="submit"
          >
            Login
          </SSignInButton>
        </SSignInRow>
      </SForm>
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
const SForm = styled.form`
`