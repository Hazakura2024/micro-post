import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api/User'
import styled from 'styled-components'

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const onClickLogout = () => {
    setUserInfo({ id: 0, token: "" })
    navigate("/");
  }

  const getMyUser = async () => {
    const user = await getUser(userInfo.id, userInfo.token);
    setUserName(user.name)
  }

  useEffect(() => {
    try {
      getMyUser();
    } catch (error : unknown) {
      console.log("ユーザー情報が取得できませんでした。")
    }
  }, [])

  return (
    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRgightItem>
        <SName>{userName}</SName>
        <SLogout onClick={onClickLogout}>ログアウト</SLogout>
      </SRgightItem>
    </SHeader>
  )
}

export default Header

const SHeader = styled.div`
  background-color: #00a3af;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #F8F8F8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`

const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justify-content: start;
`

const SRgightItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`

const SName = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
`

const SLogout = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`