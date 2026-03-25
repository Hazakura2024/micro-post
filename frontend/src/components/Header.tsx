import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [edintingName, setEditingName] = useState("")

  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserInfo({ id: 0, name: "", token: "" });
    navigate("/");
  };

  const onClickEdit = () => {
    setIsEditing((prev) => !prev)
    setEditingName("")
  }

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRgightItem>
        {isEditing
          ? <SInput type="text" placeholder="名前を入力..." value={edintingName} onChange={e => setEditingName(e.target.value)} />
          : <SName>{userInfo.name}</SName>}


        <SName>さん</SName>

        <SEdit onClick={onClickEdit}>
          <FaPen />
        </SEdit>

        <SLogout onClick={onClickLogout}>ログアウト</SLogout>

      </SRgightItem>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.div`
  background-color: #00a3af;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #f8f8f8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`;

const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justify-content: start;
`;

const SRgightItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const SName = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
`;

const SLogout = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  cursor: pointer;
`;

const SEdit = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
  cursor: pointer;
`;

const SInput = styled.input`
  height: 20px;
  margin: 10px;
`