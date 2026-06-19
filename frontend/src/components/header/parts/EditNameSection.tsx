import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';
import { useEditNameSection } from '../hooks/useEditNameSection';

const EditNameSection = () => {

    const {
        register, //inputとの紐づけ用
        handleSubmit,
        isEditingName,
        displayName,
        onClickEdit,
        isSubmitting,
        isDisabledButton
    } = useEditNameSection();

        return (
                <SEditSection>
                        {isEditingName
                                ? <SForm onSubmit={handleSubmit}>
                                        <SInput
                                                type="text"
                                                placeholder="名前を編集..."
                                                disabled={isSubmitting}
                                                {...register("name")}
                                        />
                                        <SSubmitButton
                                                type='submit'
                                                disabled={isDisabledButton}>変更</SSubmitButton>
                                </SForm>
                                : <SName>{displayName}さん</SName>}
                        <SIconButton onClick={onClickEdit} aria-label="名前を編集">
                                <FaPen />
                        </SIconButton>
                </SEditSection>
        )
}

const SEditSection = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const SInput = styled.input`
    width: 160px;
    height: 40px;
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

const SName = styled.div`
    padding: 10px 0;
    text-align: center;
    margin-right: 2px;
    font-weight: 700;
`;

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

const SForm = styled.form`
  display: flex;
    align-items: center;
    gap: 8px;
`
export default EditNameSection