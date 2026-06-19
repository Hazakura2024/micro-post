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
      <SAvatar>
        {post.user_icon
          ? <SImage src={`${import.meta.env.VITE_STORAGE_URL}${post.user_icon}`} alt="ユーザーアイコン" />
          : <FaUserCircle size={40} color={stringToColor(post.user_name)} />}
      </SAvatar>

      <SPostMain>
        <SPostMeta>
          <SDate>{getDateString(post.created_at)}</SDate>
          <SName>{post.user_name}</SName>
          <SDeleteButton
            hidden={userInfo?.id !== post.user_id}
            disabled={isDeleting}
            onClick={() => onClickDelete(post.id)}
          >
            delete
          </SDeleteButton>
        </SPostMeta>
        <SContent>{post.content}</SContent>
      </SPostMain>
    </SPost>
  );
};

export default Post;

const SPostMain = styled.div`
  display: grid;
  gap: 10px;
  min-width: 0;
`;
const SPost = styled.div`
  margin: 12px 0;
  padding: 16px;
  border-radius: var(--radius-lg);
  background: var(--color-surface-solid);
  border: 1px solid var(--color-border);
  box-shadow: 0 12px 24px rgba(8, 20, 19, 0.06);
  text-align: left;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const SAvatar = styled.div`
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(23, 106, 99, 0.08);
  overflow: hidden;
`;

const SImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const SPostMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const SName = styled.span`
  font-weight: 700;
  color: var(--color-text);
`;

const SDate = styled.span`
  font-size: 12px;
  color: var(--color-muted);
`;

const SContent = styled.div`
  line-height: 1.75;
  white-space: pre-wrap;
  word-break: break-word;
`;

const SDeleteButton = styled.button`
  margin-left: auto;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &[hidden] {
    display: none;
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;
