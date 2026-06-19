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
        <SSidebarCard>
            <SForm onSubmit={handleSubmit}>
                <SSidebarTextArea
                    rows={4}
                    disabled={isFormSubmitting}
                    {...register("message")}
                    placeholder="今つぶやきたいことを入力..."
                ></SSidebarTextArea>
                <SSidebarButton
                    type='submit'
                    disabled={isDisabledButton}
                >
                    送信
                </SSidebarButton>
            </SForm>
        </SSidebarCard>
    )
}

const SSidebarCard = styled.div`
  display: grid;
  gap: 12px;
`;

const SSidebarTextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  resize: vertical;
  line-height: 1.6;
  box-shadow: inset 0 2px 8px rgba(16, 33, 31, 0.06);
`;

const SSidebarButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-strong));
  color: #fafafa;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 22px rgba(23, 106, 99, 0.22);
  cursor: pointer;
  &:disabled {
    background: #9bb8b5;
    cursor: not-allowed;
  }
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`