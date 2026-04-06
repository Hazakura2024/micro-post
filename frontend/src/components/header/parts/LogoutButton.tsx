import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../../api/Auth';
import { UserContext } from '../../../contexts/UserContext';

const LogoutButton = () => {

    const { setUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    const onClickLogout = async () => {
        try {
            await logout();
        } catch {
            // NOTE: ユーザー情報を消すことを優先
        } finally {
            setUserInfo({ id: 0, name: "", icon_path: null, token: "" });
            navigate("/");
        }
    };

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