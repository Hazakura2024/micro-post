import styled from 'styled-components';
import { useLogoutButton } from '../hooks/useLogoutButton';

const LogoutButton = () => {

    const { onClickLogout } = useLogoutButton()

    return (
        <SLogout onClick={onClickLogout}>ログアウト</SLogout>
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