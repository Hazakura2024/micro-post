import styled from "styled-components";

export const PostListFooter = (
    {
        onClickBack,
        isDisableBackButton,
        isDisableNextButton,
        onClickNext,
    }: {
        onClickBack: () => void,
        isDisableBackButton: boolean,
        isDisableNextButton: boolean,
        onClickNext: () => void,
    }) => {


    return (
        <SFooter>
            <SPageButton
                onClick={onClickBack}
                disabled={isDisableBackButton}
            >
                前へ
            </SPageButton>
            <SPageButton
                onClick={onClickNext}
                disabled={isDisableNextButton}
            >
                次へ
            </SPageButton>
        </SFooter>
    )
}

export default PostListFooter

const SFooter = styled.div`
  display: flex;
    justify-content: flex-end;
  align-items: center;
    gap: 10px;
    margin-top: auto;
`;

const SPageButton = styled.button`
    background: linear-gradient(135deg, #d7e65c, #b8d200);
    color: #20310b;
    border-radius: 16px;
    padding: 12px 16px;
    min-width: 84px;
    font-weight: 700;
  cursor: pointer;
  &:disabled {
        background: #e8efba;
        color: #73823e;
    cursor: not-allowed;
  }
`;

