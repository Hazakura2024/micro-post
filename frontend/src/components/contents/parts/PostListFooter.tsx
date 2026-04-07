import styled from "styled-components";
import { usePostList } from "../hooks/usePostList";

export const PostListFooter = () => {

    const {
        onClickBack,
        isLoading,
        page,
        onClickNext,
        postList,
    } = usePostList()

    return (
        <SFooter>
            <SPageButton
                onClick={onClickBack}
                disabled={isLoading || page <= 1}
            >
                前へ
            </SPageButton>
            <SPageButton
                onClick={onClickNext}
                disabled={isLoading || postList.length < 10}
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

