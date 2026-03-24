import React, { useContext, useEffect, useState } from "react";
import { PostListContext } from "../providers/PostListProvider";
import Post from "./Post";
import styled from "styled-components";

const PostList = () => {
  const { postList, getPostList, isLoading } = useContext(PostListContext);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getPostList((page - 1) * 10);
  }, [page]);

  const onClickReload = () => {
    getPostList();
  };

  return (
    <SPostList>
      <SHeader>
        <div>投稿一覧 </div>
        <SReloadButton disabled={isLoading} onClick={onClickReload}>
          更新
        </SReloadButton>
        <input type="text" placeholder="内容を検索" />
        <input type="text" placeholder="ユーザーの投稿を検索" />
        <SSearchButton>検索</SSearchButton>
      </SHeader>
      {isLoading && <div>読込み中...</div>}

      {postList.map((p) => (
        <Post key={p.id} postId={p.id} userName={p.user_name} post={p} />
      ))}
      <div>
        <SDeleteButton
          onClick={() => setPage(page - 1)}
          disabled={isLoading || page <= 1}
        >
          前へ
        </SDeleteButton>
        <SDeleteButton
          onClick={() => setPage(page + 1)}
          disabled={isLoading || postList.length < 10}
        >
          次へ
        </SDeleteButton>
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

const SDeleteButton = styled.button`
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

const SSearchButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 16px;
  border-radius: 8px;
  color: #fafafa;
  width: 48px;
  cursor: pointer;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
