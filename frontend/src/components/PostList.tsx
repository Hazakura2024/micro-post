import React, { useContext, useEffect, useState } from "react";
import { PostListContext } from "../providers/PostListProvider";
import Post from "./Post";
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

  // const [page, setPage] = useState(1);
  // const [wordText, setWordText] = useState("");
  // const [userText, setUserText] = useState("");

  // FIX: 入力即時api発火で良くないので修正する必要あり

  // // 入力を遅くする
  // const [debouncedWord, setDebouncedWord] = useState(wordText)
  // const [debouncedUser, setDebouncedUser] = useState(userText)
  // useEffect(() => {
  //   const t = setTimeout(() => {
  //     setDebouncedUser(userText)
  //     setDebouncedWord(wordText)
  //   }, 400);
  //   return () => clearTimeout(t)
  // }, [wordText, userText])

  // 初表示時の取得
  useEffect(() => {
    getPostList(0, undefined, searchWord, searchName);
    setPage(1)
  }, []);

  // useEffect(() => {
  //   getPostList((page - 1) * 10, undefined, wordText, userText);
  // }, [page]);

  // 更新ボタンはこのままで良さそう
  const onClickReload = () => {
    getPostList(0, undefined, searchWord, searchName);
    setPage(1)
  };

  const onClickClear = () => {
    setSearchName("")
    setSearchWord("")
    setPage(1)
  }

  const onClickNext = () => {
    setPage(page + 1)
  }

  const onClickBack = () => {
    setPage(page - 1)
  }

  const onChangeSerachWord = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setPage(1)
    setSearchWord(e.target.value)

  }
  const onChangeSerachName = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setPage(1)
    setSearchName(e.target.value)
  }



  return (
    <SPostList>
      <SHeader>
        <div>投稿一覧 </div>
        <SReloadButton disabled={isLoading} onClick={onClickReload}>
          更新
        </SReloadButton>
        <input type="text" value={searchWord} onChange={(e) => onChangeSerachWord(e)} placeholder="内容を検索" />
        <input type="text" value={searchName} onChange={(e) => onChangeSerachName(e)} placeholder="ユーザーの投稿を検索" />
        <SClearButton onClick={onClickClear}>クリア</SClearButton>
      </SHeader>
      {isLoading && <div>読込み中...</div>}

      {postList.map((p) => (
        <Post key={p.id} postId={p.id} userName={p.user_name} post={p} />
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

const SClearButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 16px;
  border-radius: 8px;
  color: #fafafa;
  width: 54px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
