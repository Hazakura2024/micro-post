import type { PostType } from "../../../types/Post.ts";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { stringToColor } from "../../../utils/stringToColor.ts";
import { usePostItem } from "../hooks/usePostItem.tsx";

// (学習メモ): propsはオブジェクトになるので、左側に分割代入
const Post = ({
  post,
}: {
  post: PostType;
}) => {

  const {
    getDateString,
    userInfo,
    isDeleting,
    onClickDelete,
  } = usePostItem()

  return (
    <SPost>
      {post.user_icon
        ? <SImage src={`${import.meta.env.VITE_STORAGE_URL}${post.user_icon}`} alt="" />
        : <FaUserCircle size={40} color={stringToColor(post.user_name)} />}

      <SPostMain>
        <div>
          <SDate>{getDateString(post.created_at)}</SDate>
          <SName>{post.user_name}</SName>
          <SDeleteButton
            hidden={userInfo.id !== post.user_id}
            disabled={isDeleting}
            onClick={() => onClickDelete(post.id)}
          >
            delete
          </SDeleteButton>
        </div>
        <div>{post.content}</div>
      </SPostMain>
    </SPost>
  );
};

export default Post;

const SPostMain = styled.div`
`;
const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #aaaaaa;
  text-align: left;
  padding-left: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SImage = styled.img`
  height: 40px;
`

const SName = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`;

const SDate = styled.span`

  font-size: small;
  color: #000044;
`;

const SDeleteButton = styled.button`
  margin-left: 8px;
  background-color: #ee827c;
  color: white;
  border-color: #eeeeee;
  border-radius: 8px;
  color: #fafafa;
  cursor: pointer;
  &:hidden {
    display: none;
  }
  &:disabled {
    background-color: #f6bfbc;
  }
`;
