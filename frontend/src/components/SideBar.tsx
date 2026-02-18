import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { createPost } from "../api/Post";
import { PostListContext } from "../providers/PostListProvider";
import styled from "styled-components";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../utils/extractErrorMessage";

const SideBar = () => {
  const [msg, setMsg] = useState("");
  const { userInfo } = useContext(UserContext);
  const { getPostList } = useContext(PostListContext);
  const onSendClick = async () => {
    try {
      await createPost(userInfo.token, msg);

      // (学習メモ): ここに到達するということは、成功したということ
      setMsg("");

      getPostList();
      // (学習メモ): createPost 成功 → setMsg → getPostList の順番が保証されている
    } catch (error: unknown) {
      const msg = extractErrorMessage(error, '投稿に失敗しました。')
      toast.error(msg)
    }
  };

  return (
    <SSideBar>
      <SSideBarRow>新規投稿</SSideBarRow>
      <SSideBarRow>
        <SSideBarTextArea
          rows={4}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        ></SSideBarTextArea>
      </SSideBarRow>
      <SSideBarRow>
        <SSideBarButton
          disabled={(msg === "") || (msg.length > 140) ? true : false}
          onClick={onSendClick}
        >
          送信
        </SSideBarButton>
      </SSideBarRow>
    </SSideBar>
  );
};

export default SideBar;

const SSideBar = styled.div`
  padding: 8px;
`;

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`;

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  width: 96%;
  box-shadow: inset 0 2px 4px #cccccc;
`;

const SSideBarButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
  width: 100%;
  &:disabled {
    background-color: #8491c3;
    cursor: not-allowed;
  }
`;
