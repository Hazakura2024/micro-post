import React, { useContext } from 'react'
import Layout from '../components/Layout'
import { PostListProvider } from '../probviders/PostListProvider'
import { UserContext } from '../probviders/UserProvider'
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