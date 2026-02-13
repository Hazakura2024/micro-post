import React, { useContext, useEffect } from 'react'
import { PostListContext } from '../probviders/PostListProvider'
import { UserContext } from '../probviders/UserProvider'
import { getList } from '../api/Post'
import { PostType } from '../types/Post'
import { createDeflate } from 'zlib'
import Post from './Post'

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
    <div>
      <div>PostList</div>
      <button onClick={onClickReload}>更新</button>
      {postList.map((p) => (
        <Post key={p.id} post={p} />
        // <div key={p.id}>{p.content}</div>
      ))}
    </div>
  )
}


export default PostList