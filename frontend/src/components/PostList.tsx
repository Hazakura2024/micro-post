import React, { useContext, useEffect } from 'react'
import { PostListContext } from '../probviders/PostListProvider'
import { UserContext } from '../probviders/UserProvider'
import Post from './Post'
import styled from 'styled-components'

const PostList = () => {
  const { postList, setPostList, getPostList } = useContext(PostListContext)
  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    getPostList();
  }, []);

  const onClickReload = () => {
    getPostList();
  };


  return (
    <SPostList>
      <SHeader>
        <div>投稿一覧 </div>
        <SSideBarButton onClick={onClickReload}>更新</SSideBarButton>
      </SHeader>



      {postList.map((p) => (
        <Post key={p.id} post={p} />
        // <div key={p.id}>{p.content}</div>
      ))}
    </SPostList>
  )
}


export default PostList

const SPostList = styled.div`
  padding-left: 10px;
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden; 
`

const SHeader = styled.div`
    width: 100%;
    height: 32px;
    display: flex;
    flex-direction: row;
    flex-direction: row;
    align-items: center;
    padding-left: 8px;
`

const SSideBarButton = styled.button`
  background-color: #00a3af;
  border-color: #eeeeee;
  padding: 4px;
  margin: 16px;
  border-radius: 8px;
  color: #FAFAFA;
  width: 96px;
`