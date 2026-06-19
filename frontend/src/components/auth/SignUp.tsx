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
      <SCardBadge>Sign up</SCardBadge>
      <SSignUpRow>
        <SSignUpTitle>新規登録</SSignUpTitle>
        <SSignUpDescription>アカウントを作って、そのまま投稿を始められます。</SSignUpDescription>
      </SSignUpRow>
      <SForm onSubmit={handleSubmit}>
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="username">ユーザー名</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="userName"
              type="text"
              {...register("userName")}
            />
          </SSignUpInput>
        </SSignUpRow>
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="email">メールアドレス</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="email"
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
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  max-width: 560px;
  margin: 0 auto;
  padding: 28px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(18px);
`;

const SCardBadge = styled.div`
  display: inline-flex;
  margin-bottom: 18px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.14);
  color: #8a5200;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SSignUpTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.35rem, 2vw, 1.8rem);
`;

const SSignUpDescription = styled.p`
  margin: 8px 0 0;
  color: var(--color-muted);
`;

const SSignUpRow = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 14px;
`;

const SSignUpLabel = styled.span`
  color: var(--color-muted);
  font-weight: 600;
`;

const SSignUpInput = styled.span`
  display: block;

  input {
    width: 100%;
  }
`;

const SSignUpButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-strong));
  color: #f0f0f0;
  padding: 14px 16px;
  border-radius: 16px;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(23, 106, 99, 0.2);
  &:disabled {
    background: #a6b9b6;
    cursor: not-allowed;
  }
`;

const SErrorMessage = styled.div`
  color: var(--color-danger);
  background: var(--color-danger-soft);
  border-radius: 14px;
  padding: 12px 14px;
`;
const SForm = styled.form`
  display: grid;
  gap: 4px;
`