import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPen, FaRegUserCircle } from "react-icons/fa";
import { editUser } from "../api/User";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { PostListContext } from "../providers/PostListProvider";

const Header = () => {
  const { userInfo, setUserInfo, saveInfoWithName } = useContext(UserContext);
  const { refreshCurrent } = useContext(PostListContext)

  const [isEditingName, setIsEditingName] = useState(false);
  const [editningName, setEditingNameName] = useState("")
  const [isSubmittingName, setIsSubmittingName] = useState(false)

  const [isEditingImage, setIsEdigingImage] = useState(false)
  const [selectedFile, setSelectedFile] = useState()
  const [isSubbmittingImage, setIsSubimittingImage] = useState()

  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserInfo({ id: 0, name: "", token: "" });
    navigate("/");
  };

  const onClickEdit = () => {
    setIsEditingName((prev) => !prev)
    setEditingNameName("")
  }

  const onClickEditImage = () => {
    setIsEdigingImage((prev) => !prev)
    setSelectedFile()
  }


  const onClickSend = async () => {
    setIsSubmittingName(true)
    try {
      await editUser(userInfo.token, editningName)
      setEditingNameName("")

      await saveInfoWithName(userInfo.id, userInfo.token,)
      toast.success("名前の変更に成功しました！")
      setIsEditingName(false)
      refreshCurrent()

    } catch (error) {
      const msg = extractErrorMessage(error, "名前の変更に失敗しました")
      toast.error(msg)
    } finally {
      setIsSubmittingName(false)
    }
  }

  const onClickSubmitImage = async () => {
    try {
      console.log("trt-block")
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedFile()
    }
  }

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRgightItem>
        {isEditingName
          ? <div>
            <SInput type="text" placeholder="名前を編集..." value={editningName} onChange={e => setEditingNameName(e.target.value)} />
            <SSubmitButton onClick={onClickSend} disabled={editningName.length > 20}>変更</SSubmitButton>
          </div>
          : <SName>{userInfo.name}</SName>}
        <SName>さん</SName>

        {isEditingImage
          ? <div>
            <SInput type="file" accept="image/png, image/jpg " />
            <SSubmitButton onClick={onClickSubmitImage}>送信</SSubmitButton>
          </div>
          : <div></div>}





        <SIconButton onClick={onClickEdit} >
          <FaPen />
        </SIconButton>

        <SIconButton onClick={onClickEditImage}>
          <FaRegUserCircle />
        </SIconButton>

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

const SIconButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding-top: 4px;
  padding-bottom: 4px;
  text-align: center;
  cursor: pointer;
`;

const SInput = styled.input`
  height: 24px;
  box-sizing: border-box;
`

const SSubmitButton = styled.button`
  background-color: #b8d200;
  margin-top: 4px;
  color: white;
  border-color: #eeeeee;
  border-radius: 4px;
  color: #fafafa;
  box-sizing: border-box;
  cursor: pointer;
  &:disabled {
    background-color: #d8e698;
    cursor: not-allowed;
  }
`;