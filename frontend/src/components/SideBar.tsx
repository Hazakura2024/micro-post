import React, { useContext, useState } from 'react'
import { UserContext } from '../probviders/UserProvider'
import { createPost } from '../api/Post';
import { PostListContext } from '../probviders/PostListProvider';
import styled from 'styled-components';


const SideBar = () => {

  const [msg, setMsg] = useState('')
  const { userInfo } = useContext(UserContext);
  const { getPostList } = useContext(PostListContext)
  const onSendClick = async () => {
    try {
      await createPost(userInfo.token, msg);

      // ここに到達するということは、成功したということ
      setMsg("");
      
      getPostList()
      // createPost 成功 → setMsg → getPostList の順番が保証されている

    } catch (error) {
      console.log("通信に失敗しました", error);
      alert("通信に失敗しました！");
    }
  };

  return (
    <SSideBar>
      <SSideBarRow>新規投稿</SSideBarRow>
      <SSideBarRow>
        <SSideBarTextArea rows ={4} value={msg} onChange={(e) => setMsg(e.target.value)}></SSideBarTextArea>
      </SSideBarRow>
      <SSideBarRow>
        <SSideBarButton disabled={msg === ''? true : false} onClick={onSendClick}>送信</SSideBarButton>
      </SSideBarRow>
    </SSideBar>
  )
}

export default SideBar

const SSideBar = styled.div`
  padding: 8px;
`

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  width: 96%;
  box-shadow: inset 0 2px 4px #CCCCCC;
`

const SSideBarButton = styled.button`
  background-color: ${props => props.disabled? "#8491c3" : "#00a3af"};
  border-color: #eeeeee;
  padding: 4px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 100%;
`