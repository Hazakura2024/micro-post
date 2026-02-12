import React, { useContext, useEffect } from 'react'
import { PostListContext } from '../probviders/PostListProvider'
import { UserContext } from '../probviders/UserProvider'
import { getList } from '../api/Post'
import { PostType } from '../types/Post'
import { createDeflate } from 'zlib'

const PostList = () => {
  const { postList, setPostList } = useContext(PostListContext)
  const { userInfo } = useContext(UserContext)



  useEffect(() => {
    const getPostList = async () => {
      const posts = await getList(userInfo.token);
      console.log(posts)

      if (posts) {
        const formattedPosts = posts.map((p: any) => (
          {
            id: p.id,
            user_name: p.username,
            content: p.content,
            created_at: new Date(p.created_at),
          }
        )
        )
        setPostList(formattedPosts)
      }

    }
    getPostList();
  }, []);

  return (
    <div>
      {postList.map((p) => (
        <div key={p.id}>{p.content}</div>
      ))}
    </div>
  )
}

export default PostList