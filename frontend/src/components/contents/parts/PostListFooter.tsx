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
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`;

const SPageButton = styled.button`
  background-color: #b8d200;
  color: white;
  border-color: #eeeeee;
  border-radius: 4px;
  color: #fafafa;
  cursor: pointer;
  &:disabled {
    background-color: #d8e698;
    cursor: not-allowed;
  }
`;

