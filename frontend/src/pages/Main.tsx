import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { PostListProvider } from '../providers/PostListProvider'
import { UserContext } from '../providers/UserProvider'
import { Navigate } from 'react-router-dom'

const Main = () => {
  const { userInfo } = useContext(UserContext);
  const loggedIn = (userInfo.token !== '');

  return (
    <PostListProvider>
        {
          loggedIn ? <Layout></Layout>:<Navigate replace to="/" />
        }
    </PostListProvider>
  )
}

export default Main