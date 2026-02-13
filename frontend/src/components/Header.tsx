import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../probviders/UserProvider'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api/User'

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [ userName, setUserName ] = useState("");

  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserInfo({id: 0, token: "" })
    navigate("/");
  }

  const getMyUser = async() => {
    const user = await getUser(userInfo.id, userInfo.token);
    setUserName(user.name)
  }

  useEffect(() => {
    try {
      getMyUser();
    } catch (error) {
      console.log("ユーザー情報が取得できませんでした。")
    }
  },[])

  return (
    <div>
      <span>MicoPost</span>
      <span>　ユーザー:{userName}　</span>
      <span><button onClick={onClickLogout}>ログアウト</button></span>
    </div>
  )
}

export default Header