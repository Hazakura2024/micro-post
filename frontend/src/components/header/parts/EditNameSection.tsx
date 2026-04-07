import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { editUser } from '../../../api/User';
import { toast } from 'react-toastify';
import { PostListContext } from '../../../contexts/PostListContext';
import { UserContext } from '../../../contexts/UserContext';
import { extractErrorMessage } from '../../../utils/extractErrorMessage';
import { FaPen } from 'react-icons/fa';

const EditNameSection = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editingName, setEditingName] = useState("")
    const [isSubmittingName, setIsSubmittingName] = useState(false)
    const { refreshCurrent } = useContext(PostListContext)
    const { userInfo, saveInfoWithName } = useContext(UserContext);


    const onClickEdit = () => {
        setIsEditingName((prev) => !prev)
        setEditingName("")
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
    return (
        <SEditName>
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
            <SIconButton onClick={onClickEdit} >
                <FaPen />
            </SIconButton>
        </SEditName>
    )
}

const SEditName = styled.div`
    display: flex;
    align-items: center;
`

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


export default EditNameSection