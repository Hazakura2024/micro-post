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
    localSearchWord,
    onChangeSearchWord,
    localSearchName,
    onChangeSearchName,
    onClickSearch,
    onClickClear,
    onClickBack,
    page,
    onClickNext,
    postList,
  } = usePostList()

  return (
    <SPostList>
      <PostListHeader {...{
        isLoading,
        onClickReload,
        localSearchWord,
        onChangeSearchWord,
        localSearchName,
        onChangeSearchName,
        onClickSearch,
        onClickClear,
      }} />
      <PostListBody {...{
        isLoading,
        postList,
      }} />
      <PostListFooter {...{
        onClickBack,
        isLoading,
        page,
        onClickNext,
        postList,
      }} />
    </SPostList>
  );
};

const SPostList = styled.div`
  padding-left: 10px;
  margin-top: 16px;
`;

export default Contents;
