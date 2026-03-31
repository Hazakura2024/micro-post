import React, { useContext, useState } from "react";
import type { PostType } from "../types/Post";
import styled from "styled-components";
import { deletePost } from "../api/Post";
import { FaUserCircle } from "react-icons/fa";
import { PostListContext } from "../providers/PostListProvider";
import { extractErrorMessage } from "../utils/extractErrorMessage";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { stringToColor } from "../utils/stringToColor";

// (学習メモ): propsはオブジェクトになるので、左側に分割代入
const Post = ({
  post,
}: {
  post: PostType;
}) => {
  const { userInfo } = useContext(UserContext);
  const { getPostList } = useContext(PostListContext);

  // const isMyPost =  userName === userInfo.id;

  // FIX: localhostだとUTCになってrenderだとJTCになるっぽい？
  // NOTE: サーバーがZをつけて、UTCであるという指定をしていないので、ここでつける
  // const dateString = post.created_at.toString().endsWith("Z")
  //   ? post.created_at
  //   : `${post.created_at.toString().replace(" ", "T")}Z`;
  const date = new Date(post.created_at);
  const getDateString = (dateObj: Date) => {
    return dateObj.toLocaleString();
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const onClickDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deletePost(post.id, userInfo.token);
      await getPostList();
      toast.success("削除しました");
    } catch (error) {
      const msg = extractErrorMessage(error, "削除に失敗しました。");
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <SPost>

      {post.user_icon ? <SImage src={`${import.meta.env.VITE_STORAGE_URL}${post.user_icon}`} alt="" /> : <FaUserCircle size={40} color={stringToColor(post.user_name)} />}

      <SPostMain>
        <div>
          <SName>{getDateString(date)}</SName>
          <SDate>{post.user_name}</SDate>
          <SDeleteButton
            hidden={userInfo.id !== post.user_id}
            disabled={isDeleting}
            onClick={onClickDelete}
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

const SIcon = styled.div`
  
`

const SImage = styled.img`
  height: 40px;
`

const SName = styled.span`
  font-size: small;
  color: #000044;
`;

const SDate = styled.span`
  margin-left: 8px;
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
