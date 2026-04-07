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

  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

