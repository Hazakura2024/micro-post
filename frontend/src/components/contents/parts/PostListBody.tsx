import Post from "./Post.tsx";
import styled from "styled-components";
import { usePostList } from "../hooks/usePostList.tsx";

export const PostListBody = () => {

  const { isLoading, postList } = usePostList()

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

