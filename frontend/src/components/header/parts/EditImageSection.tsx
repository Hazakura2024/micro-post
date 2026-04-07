import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { UserContext } from '../../../contexts/UserContext';
import { uploadIcon } from '../../../api/User';
import { toast } from 'react-toastify';
import { extractErrorMessage } from '../../../utils/extractErrorMessage';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { stringToColor } from '../../../utils/stringToColor';

const EditImageSection = () => {


    const [isEditingImage, setIsEditingImage] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>()
    const [isSubmittingImage, setIsSubmittingImage] = useState(false)

    const { userInfo, setUserInfo } = useContext(UserContext);





    const onClickEditImage = () => {
        setIsEditingImage((prev) => !prev)
        setSelectedFile(null)
    }

    const onChangeInputImage = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file);
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
        <SEditSection>
            {isEditingImage
                ? <SEditSection>
                    <SInput type="file" accept="image/png, image/jpg " onChange={e => onChangeInputImage(e)} />
                    {previewUrl ? <SImage src={previewUrl} alt="選択中の画像プレビュー" /> : <div></div>}
                    <SSubmitButton onClick={onClickSubmitImage} disabled={isSubmittingImage}>送信</SSubmitButton>
                </SEditSection>
                : (userInfo.icon_path
                    ? <SImage src={`${import.meta.env.VITE_STORAGE_URL}${userInfo.icon_path}`} />
                    : <FaUserCircle color={stringToColor(userInfo.name)} />)}
            <SIconButton onClick={onClickEditImage}>
                <FaRegUserCircle />
            </SIconButton>
        </SEditSection>
    )
}

const SEditSection = styled.div`
    display: flex;
    align-items: center;
`

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

export default EditImageSection