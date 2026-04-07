import styled from 'styled-components';
import { FaPen } from 'react-icons/fa';
import { useEditNameSection } from '../hooks/useEditNameSection';

const EditNameSection = () => {

    const {
        isEditingName,
        editingName,
        setEditingName,
        onClickSend,
        displayName,
        onClickEdit,
        canSubmittingName
    } = useEditNameSection();

    return (
        <SEditSection>
            {isEditingName
                ? <div>
                    <SInput
                        type="text"
                        placeholder="名前を編集..."
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)} />
                    <SSubmitButton
                        onClick={onClickSend}
                        disabled={!canSubmittingName}>変更</SSubmitButton>
                </div>
                : <SName>{displayName}さん</SName>}
            <SIconButton onClick={onClickEdit} >
                <FaPen />
            </SIconButton>
        </SEditSection>
    )
}

const SEditSection = styled.div`
    display: flex;
    align-items: center;
`

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
  padding-top: 6px;
  text-align: center;
  cursor: pointer;
`;


export default EditNameSection