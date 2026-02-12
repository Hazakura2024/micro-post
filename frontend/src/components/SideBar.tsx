import React, { useContext, useState } from 'react'
import { UserContext } from '../probviders/useProvider'
import { createPost } from '../api/Post';


const SideBar = () => {

  const [msg, setMsg] = useState('')
  const { userInfo } = useContext(UserContext);
  const onSendClick = () => {
    try {
      createPost(userInfo.token, msg);

      // ここに到達するということは、成功したということ
      setMsg("");

    } catch (error) {
      console.log("通信に失敗しました", error);
      alert("通信に失敗しました！");
    }
  };

  return (
    <div>
      <div>hoge</div>
      <div>hoge@example.com</div>
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