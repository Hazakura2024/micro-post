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
      <SCardBadge>Sign in</SCardBadge>
      <SForm onSubmit={handleSubmit}>
        <SSignInTitle>ログイン</SSignInTitle>
        <SSignInDescription>既存アカウントでタイムラインへ入ります。</SSignInDescription>
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
              {errors.root?.message || (Object.values(errors)[0])?.message}
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
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SSignInTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.35rem, 2vw, 1.8rem);
`;

const SSignInDescription = styled.p`
  margin: 8px 0 20px;
  color: var(--color-muted);
`;

const SSignInRow = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 14px;
`;

const SSignInLabel = styled.span`
  color: var(--color-muted);
  font-weight: 600;
`;

const SSignInInput = styled.span`
  display: block;

  input {
    width: 100%;
  }
`;

const SSignInButton = styled.button`
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