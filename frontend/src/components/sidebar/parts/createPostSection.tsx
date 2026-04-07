import { useCreatePostSection } from '../hooks/useCreatePostSection';
import styled from 'styled-components';

export const CreatePostSection = () => {

    const {
        msg,
        onChangeMessage,
        onSendClick,
        canSubmitMessage
    } = useCreatePostSection()

    return (
        <SSideBarRow>
            <SSideBarTextArea
                rows={4}
                value={msg}
                onChange={(e) => onChangeMessage(e.target.value)}
            ></SSideBarTextArea>
            <SSideBarButton
                disabled={!canSubmitMessage}
                onClick={onSendClick}
            >
                送信
            </SSideBarButton>
        </SSideBarRow>
    )
}

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`;

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  width: 96%;
  box-shadow: inset 0 2px 4px #cccccc;
`;

const SSideBarButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
  width: 100%;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
