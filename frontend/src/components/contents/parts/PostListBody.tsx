import Post from "./Post.tsx";
import styled from "styled-components";
import type { PostType } from "../../../types/Post.ts";

export const PostListBody = ({ isLoading, postList }: { isLoading: boolean, postList: PostType[] }) => {

  return (
    <SPostListBody>
      {isLoading && <div>読込み中...</div>}
      {postList.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </SPostListBody>
  );
};


const SPostListBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  scrollbar-width: thin;
`;

