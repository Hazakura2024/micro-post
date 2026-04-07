import React from "react";
import { PostListBody } from "./parts/PostListBody";
import { PostListHeader } from "./parts/PostListHeader";
import { PostListFooter } from "./parts/PostListFooter";
import styled from "styled-components";


const Contents = () => {
  return (
    <SPostList>
      <PostListHeader />
      <PostListBody />
      <PostListFooter />
    </SPostList>
  );
};

const SPostList = styled.div`
  padding-left: 10px;
  margin-top: 16px;
`;

export default Contents;
