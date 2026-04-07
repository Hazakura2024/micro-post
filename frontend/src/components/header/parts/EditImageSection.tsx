import styled from 'styled-components';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { stringToColor } from '../../../utils/stringToColor';
import { useEditImageSection } from '../hooks/useEditImageSection';

const EditImageSection = () => {

    const {
        isEditingImage,
        previewUrl,
        onClickSubmitImage,
        isSubmittingImage,
        userInfo,
        onClickEditImage,
        onChangeInputImage,
    } = useEditImageSection()

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
  padding-top: 6px;
  text-align: center;
  cursor: pointer;
`;

const SInput = styled.input`
  height: 24px;
  box-sizing: border-box;
`

const SSubmitButton = styled.button`
  background-color: #b8d200;
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