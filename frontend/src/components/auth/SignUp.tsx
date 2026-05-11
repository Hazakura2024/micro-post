import styled from "styled-components";
import { useSignUp } from "./hooks/useSignUp";

const SignUp = () => {

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  } = useSignUp()

  return (
    <SSignUpFrame>
      <SSignUpRow>
        <h3>新規登録</h3>
      </SSignUpRow>
      <SForm onSubmit={handleSubmit}>
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="id">ユーザー名</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="id"
              type="text"
              {...register("userName")}
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
              type="email"
              {...register("email")}
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
              type="password"
              {...register("password")}
            />
          </SSignUpInput>
        </SSignUpRow>
        <SSignUpRow>
          {errors.root?.message || <SErrorMessage>{(Object.values(errors)[0])?.message}</SErrorMessage>}
        </SSignUpRow>
        <SSignUpRow>
          <SSignUpButton
            disabled={isSubmitting}
            type="submit"
          >
            SignUp
          </SSignUpButton>
        </SSignUpRow>
      </SForm>
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
const SForm = styled.form`
`