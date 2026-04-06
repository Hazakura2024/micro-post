import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FaPen, FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { editUser, uploadIcon } from "../../api/User.ts";
import { UserContext } from "../../contexts/UserContext.tsx";
import { PostListContext } from "../../contexts/PostListContext.tsx";
import { extractErrorMessage } from "../../utils/extractErrorMessage.ts";
import { stringToColor } from "../../utils/stringToColor.ts";
import LogoutButton from "./parts/LogoutButton.tsx";

const Header = () => {
  const { userInfo, setUserInfo, saveInfoWithName } = useContext(UserContext);
  const { refreshCurrent } = useContext(PostListContext)

  const [isEditingName, setIsEditingName] = useState(false);
  const [editingName, setEditingName] = useState("")
  const [isSubmittingName, setIsSubmittingName] = useState(false)

  const [isEditingImage, setIsEditingImage] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [isSubmittingImage, setIsSubmittingImage] = useState(false)





  const onClickEdit = () => {
    setIsEditingName((prev) => !prev)
    setEditingName("")
  }

  const onClickEditImage = () => {
    setIsEditingImage((prev) => !prev)
    setSelectedFile(null)
  }

  const onChangeInputImage = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  }


  const onClickSend = async () => {
    setIsSubmittingName(true)
    try {
      await editUser(editingName)
      setEditingName("")

      await saveInfoWithName(userInfo.id)
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
    setIsSubmittingImage(true)
    try {
      if (!selectedFile) return;
      const res = await uploadIcon(selectedFile);
      console.log(res)
      setUserInfo({ ...userInfo, icon_path: res.icon_path })
      toast.success("アイコンの変更に成功しました！")
    } catch (error) {
      console.log(error);
      const msg = extractErrorMessage(error, "アイコンの変更に失敗しました")
      toast.error(msg)
    } finally {
      setSelectedFile(null)
      setIsSubmittingImage(false)
      setIsEditingImage(false)
    }
  }

  const [previewUrl, setPreviewUrl] = useState<string | null>();

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url)

    return () => { URL.revokeObjectURL(url); };

  }, [selectedFile])

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRightItem>
        {isEditingName
          ? <div>
            <SInput
              type="text"
              placeholder="名前を編集..."
              value={editingName}
              onChange={e => setEditingName(e.target.value)} />
            <SSubmitButton
              onClick={onClickSend}
              disabled={isSubmittingName || editingName.length > 20}>変更</SSubmitButton>
          </div>
          : <SName>{userInfo.name}さん</SName>}

        {isEditingImage
          ? <div>
            <SInput type="file" accept="image/png, image/jpg " onChange={e => onChangeInputImage(e)} />
            {previewUrl ? <SImage src={previewUrl} alt="選択中の画像プレビュー" /> : <div>画像未選択</div>}
            <SSubmitButton onClick={onClickSubmitImage} disabled={isSubmittingImage}>送信</SSubmitButton>
          </div>
          : (userInfo.icon_path
            ? <SImage src={`${import.meta.env.VITE_STORAGE_URL}${userInfo.icon_path}`} />
            : <FaUserCircle color={stringToColor(userInfo.name)} />)}





        <SIconButton onClick={onClickEdit} >
          <FaPen />
        </SIconButton>

        <SIconButton onClick={onClickEditImage}>
          <FaRegUserCircle />
        </SIconButton>

        <LogoutButton />

      </SRightItem>
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

const SRightItem = styled.div`
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

const SImage = styled.img`
  height: 24px ;
`