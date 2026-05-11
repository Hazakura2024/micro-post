import { useCreatePostSection } from '../hooks/useCreatePostSection';
import styled from 'styled-components';

export const CreatePostSection = () => {

    const {
        register,
        handleSubmit,
        isFormSubmitting,
        isDisabledButton,
    } = useCreatePostSection()

    return (
        <SSideBarRow>
            <SForm onSubmit={handleSubmit}>
                <SSideBarTextArea
                    rows={4}
                    disabled={isFormSubmitting}
                    {...register("message")}
                ></SSideBarTextArea>
                <SSideBarButton
                    type='submit'
                    disabled={isDisabledButton}
                >
                    送信
                </SSideBarButton>
            </SForm>
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

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`