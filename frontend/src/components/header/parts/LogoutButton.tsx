import styled from 'styled-components';
import { useLogoutButton } from '../hooks/useLogoutButton.tsx';

const LogoutButton = () => {

    const { onClickLogout, isLoggingOut } = useLogoutButton()

    return (
        <SLogout disabled={isLoggingOut} onClick={onClickLogout}>ログアウト</SLogout>
    )
}

const SLogout = styled.button`
  background-color: rgba(255, 255, 255, 0.12);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
`;

export default LogoutButton