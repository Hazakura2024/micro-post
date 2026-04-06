import React, { useContext, useEffect, useState } from "react";
import { PostListContext } from "../../../contexts/PostListContext.tsx";
import Post from "./Post.tsx";
import styled from "styled-components";

const PostList = () => {
  const {
    postList,
    getPostList,
    isLoading,
    page,
    setPage,
    searchWord,
    setSearchWord,
    searchName,
    setSearchName,
  } = useContext(PostListContext);

  const [localSearchWord, setLocalSearchWord] = useState("");
  const [localSearchName, setLocalSearchName] = useState("");

  // 初表示時の取得
  useEffect(() => {
    getPostList(0, undefined, searchWord, searchName);
    setPage(1)
  }, []);

  // 更新ボタンはこのままで良さそう
  const onClickReload = () => {
    getPostList(0, undefined, searchWord, searchName);
    setPage(1)
  };

  const onClickClear = () => {
    setSearchName("")
    setSearchWord("")
    setPage(1)
    setLocalSearchName("")
    setLocalSearchWord("")
  }

  const onClickNext = () => {
    setPage(page + 1)
  }

  const onClickBack = () => {
    setPage(page - 1)
  }

  const onChangeSerachWord = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setLocalSearchWord(e.target.value)

  }
  const onChangeSerachName = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setLocalSearchName(e.target.value)
  }

  const onClickSearch = () => {
    setPage(1)
    setSearchName(localSearchName)
    setSearchWord(localSearchWord)
  }



  return (
    <SPostList>
      <SHeader>
        <div>投稿一覧 </div>
        <SReloadButton disabled={isLoading} onClick={onClickReload}>
          更新
        </SReloadButton>
        <input type="text" value={localSearchWord} onChange={(e) => onChangeSerachWord(e)} placeholder="内容を検索" />
        <input type="text" value={localSearchName} onChange={(e) => onChangeSerachName(e)} placeholder="ユーザーの投稿を検索" />
        <SMiniButton onClick={onClickSearch}>検索</SMiniButton>
        <SMiniButton onClick={onClickClear}>クリア</SMiniButton>
      </SHeader>
      {isLoading && <div>読込み中...</div>}

      {postList.map((p) => (
        <Post key={p.id} post={p} />
      ))}
      <div>
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
      </div>
    </SPostList>
  );
};

export default PostList;

const SPostList = styled.div`
  padding-left: 10px;
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const SHeader = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
`;

const SReloadButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 16px;
  border-radius: 8px;
  color: #fafafa;
  width: 96px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
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

const SMiniButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 6px;
  border-radius: 8px;
  color: #fafafa;
  width: 54px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
