import React, { useContext, useEffect } from 'react'
import { PostListContext } from '../probviders/PostListProvider'
import { UserContext } from '../probviders/UserProvider'
import { getList } from '../api/Post'
import { PostType } from '../types/Post'
import { createDeflate } from 'zlib'
import Post from './Post'

const PostList = () => {
  const { postList, setPostList } = useContext(PostListContext)
  const { userInfo } = useContext(UserContext)


  const getPostList = async () => {
    const posts = await getList(userInfo.token);
    console.log(posts)

    if (posts) {
      const formattedPosts = posts.map((p: any) => (
        {
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        }
      )
      )
      setPostList(formattedPosts)
    }

  }

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