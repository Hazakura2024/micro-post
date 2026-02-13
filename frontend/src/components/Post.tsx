import React from 'react'
import { PostType } from '../types/Post'

// (学習メモ): key属性もpropsオブジェクトに含まれるので、左側に分割代入
const Post = ({ post }: { post: PostType }) => {

  const getDateString = (dateObj :Date) => {
    return dateObj.toLocaleString('ja-JP');
  }

  console.log("Post.tsxでは",post.user_name)
  return (
    <div>
        <div>{getDateString(post.created_at)}</div>
        <div>{post.user_name}</div>
        <div>{post.content}</div>
        <br />
    </div>
  )
}

export default Post