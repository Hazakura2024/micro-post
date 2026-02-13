import React, { useContext } from 'react'
import { UserContext } from '../probviders/UserProvider'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserInfo({id: 0, token: "" })
    navigate("/");
  }

  return (
    <div>
      <span>MicoPost</span>
      <span>ユーザーID:{userInfo.id}</span>
      <span><button onClick={onClickLogout}>ログアウト</button></span>
    </div>
  )
}

export default Header