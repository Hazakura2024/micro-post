import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { editUser } from "../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const Header = () => {
  const { userInfo, setUserInfo, saveInfoWithName } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editningName, setEditingName] = useState("")
  const [isSendingName, setIsSendingName] = useState(false)

  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserInfo({ id: 0, name: "", token: "" });
    navigate("/");
  };

  const onClickEdit = () => {
    setIsEditing((prev) => !prev)
    setEditingName("")
  }

  const onClickSend = async () => {
    setIsSendingName(true)
    try {
      await editUser(userInfo.token, editningName)
      setEditingName("")

      await saveInfoWithName(userInfo.id, userInfo.token,)
      toast.success("名前の変更に成功しました！")

    } catch (error) {
      const msg = extractErrorMessage(error, "名前の変更に失敗しました")
      toast.error(msg)
    } finally {
      setIsSendingName(false)
    }
  }

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRgightItem>
        {isEditing
          ? <div>
            <SInput type="text" placeholder="名前を入力..." value={editningName} onChange={e => setEditingName(e.target.value)} />
            <SNameButton onClick={onClickSend} disabled={isSendingName}>送信</SNameButton>
          </div>
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
  margin-top: 8px;
`

const SNameButton = styled.button`
  background-color: #b8d200;
  margin-top: 4px;
  color: white;
  border-color: #eeeeee;
  border-radius: 4px;
  color: #fafafa;
  cursor: pointer;
  &:disabled {
    background-color: #d8e698;
    cursor: not-allowed;
  }
`;