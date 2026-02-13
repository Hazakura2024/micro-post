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

      <span>PostList </span>
      <button onClick={onClickReload}>更新</button>


      {postList.map((p) => (
        <Post key={p.id} post={p} />
        // <div key={p.id}>{p.content}</div>
      ))}
    </SPostList>
  )
}


export default PostList

const SPostList = styled.div`
  paddig-left: 10px;
  margin-top: 16px;
  height: 100%;
  overflow-y: scroll;
`