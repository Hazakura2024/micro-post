import React from "react";
import { PostType } from "../types/Post";
import styled from "styled-components";

// (学習メモ): propsはオブジェクトになるので、左側に分割代入
const Post = ({ post }: { post: PostType }) => {
  const dateString = `${post.created_at}Z`
  const date = new Date(dateString);
  const getDateString = (dateObj: Date) => {
    return dateObj.toLocaleString();
  };
  return (
    <SPost>
      <div>
        <SName>{getDateString(date)}</SName>
        <SDate>{post.user_name}</SDate>
      </div>
      <div>{post.content}</div>
    </SPost>
  );
};

export default Post;

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #aaaaaa;
  text-align: left;
  padding-left: 8px;
`;

const SName = styled.span`
  font-size: small;
  color: #000044;
`;

const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`;
