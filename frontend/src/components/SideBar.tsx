import React, { useContext, useState } from 'react'
import { UserContext } from '../probviders/UserProvider'
import { createPost } from '../api/Post';
import { PostListContext } from '../probviders/PostListProvider';


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
    <div>
      <div>新規投稿</div>
      <div></div>
      <div>
        <textarea rows ={4} value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
      </div>
      <div>
        <button onClick={onSendClick}>送信</button>
      </div>
    </div>
  )
}

export default SideBar