import React from "react";
import { PostListBody } from "./parts/PostListBody";
import { PostListHeader } from "./parts/PostListHeader";
import { PostListFooter } from "./parts/PostListFooter";
import styled from "styled-components";
import { usePostList } from "./hooks/usePostList";


const Contents = () => {

  const {
    isLoading,
    onClickReload,
    onClickClear,
    onClickBack,
    isDisableBackButton,
    isDisableNextButton,
    onClickNext,
    postList,
    register,
    handleSubmit,
  } = usePostList()

  return (
    <SPostList>
      <PostListHeader {...{
        isLoading,
        onClickReload,
        onClickClear,
        register,
        handleSubmit,
      }} />
      <PostListBody {...{
        isLoading,
        postList,
      }} />
      <PostListFooter {...{
        onClickBack,
        isDisableBackButton,
        isDisableNextButton,
        onClickNext,
        postList,
      }} />
    </SPostList>
  );
};

const SPostList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 72vh;
  padding: 20px;
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(18px);
  gap: 16px;
`;

export default Contents;
