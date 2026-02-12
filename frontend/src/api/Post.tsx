import axios from 'axios'
import React from 'react'


const Post = () => {
  return 
  (
    <div>Post</div>
  )
}

const getList = async(token: string) => {
    const url =`http://localhost:3000/post?token=${token}`;
    const res = await axios.get(url)
    return res;
}

export default Post