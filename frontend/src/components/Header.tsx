import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPen, FaRegUserCircle } from "react-icons/fa";
import { editUser, getIcon, uploadIcon } from "../api/User";
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
  const [selectedFile, setSelectedFile] = useState<File | null>()
  const [isSubbmittingImage, setIsSubimittingImage] = useState(false)

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
    setSelectedFile(null)
  }

  const onChangeInputImage = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
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
    setIsSubimittingImage(true)
    try {

      if (!selectedFile) return;
      const res = await uploadIcon(userInfo.token, selectedFile);
      console.log(res)
      toast.success("アイコンの変更に成功しました！")
    } catch (error) {
      console.log(error);
      const msg = extractErrorMessage(error, "アイコンの変更に失敗しました")
      toast.error(msg)
    } finally {
      setSelectedFile(null)
      setIsSubimittingImage(false)
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

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getImageURL = async (token: string) => {
      const imgUrl = await getIcon(token);
      setImageUrl(imgUrl);
    }
    getImageURL(userInfo.token)
  }, [isEditingImage])



  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRgightItem>
        {isEditingName
          ? <div>
            <SInput type="text" placeholder="名前を編集..." value={editningName} onChange={e => setEditingNameName(e.target.value)} />
            <SSubmitButton onClick={onClickSend} disabled={isSubmittingName || editningName.length > 20}>変更</SSubmitButton>
          </div>
          : <SName>{userInfo.name}さん</SName>}

        {isEditingImage
          ? <div>
            <SInput type="file" accept="image/png, image/jpg " onChange={e => onChangeInputImage(e)} />
            {previewUrl ? <SImage src={previewUrl} alt="選択中の画像プレビュー" /> : <div>画像未選択</div>}
            <SSubmitButton onClick={onClickSubmitImage} disabled={isSubbmittingImage}>送信</SSubmitButton>
          </div>
          : <SImage src={`${import.meta.env.VITE_STORAGE_URL}${imageUrl}`} />}





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

const SImage = styled.img`
  height: 24px ;
`