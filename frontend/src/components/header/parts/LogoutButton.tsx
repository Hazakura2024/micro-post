import styled from 'styled-components';
import { useLogoutButton } from '../hooks/useLogoutButton.tsx';

const LogoutButton = () => {

    const { onClickLogout, isLoggingOut } = useLogoutButton()

    return (
        <SLogout disabled={isLoggingOut} onClick={onClickLogout}>ログアウト</SLogout>
    )
}

const SLogout = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  cursor: pointer;
`;

export default LogoutButton