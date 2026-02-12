import React, { useState } from 'react'

const SideBar = () => {

  const [msg, setMsg] = useState('')
  return (
    <div>
      <div>hoge</div>
      <div>hoge@example.com</div>
      <div>
        <textarea rows ={4} value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
      </div>
      <div>
        <button>送信</button>
      </div>
    </div>
  )
}

export default SideBar