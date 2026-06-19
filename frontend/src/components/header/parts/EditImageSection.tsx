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
        iconPath,
        userName,
        onClickEditImage,
        onChangeInputImage,
        isDisabledButton
    } = useEditImageSection()

    return (
        <SEditSection>
            {isEditingImage
                ? <SEditSection>
            <SFileInput id="edit-image-file-input" type="file" accept="image/png, image/jpg, image/jpeg" onChange={e => onChangeInputImage(e)} />
            <SFileLabel htmlFor="edit-image-file-input">画像を選択</SFileLabel>
                    {previewUrl ? <SImage src={previewUrl} alt="選択中の画像プレビュー" /> : <div></div>}
                    <SSubmitButton onClick={onClickSubmitImage} disabled={isSubmittingImage || isDisabledButton}>送信</SSubmitButton>
                </SEditSection>
                : (iconPath
                    ? <SImage src={`${import.meta.env.VITE_STORAGE_URL}${iconPath}`} alt="ユーザーアイコン" />
                    : <FaUserCircle size={36} color={stringToColor(userName)} />)}
            <SIconButton onClick={onClickEditImage} aria-label="画像を編集">
                <FaRegUserCircle />
            </SIconButton>
        </SEditSection>
    )
}

const SEditSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const SIconButton = styled.button`
  background-color: rgba(255, 255, 255, 0.12);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  text-align: center;
  cursor: pointer;
`;

const SInput = styled.input`
  width: 180px;
  height: 40px;
`;

const SFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SFileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 108px;
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: white;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SSubmitButton = styled.button`
  background: rgba(255, 255, 255, 0.14);
  color: white;
  border-radius: 999px;
  padding: 10px 14px;
  font-weight: 700;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  object-fit: cover;
`

export default EditImageSection