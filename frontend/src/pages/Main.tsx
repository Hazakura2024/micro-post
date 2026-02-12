import React from 'react'
import Layout from '../components/Layout'
import { PostListProvider } from '../probviders/PostListProvider'

const Main = () => {
  return (
    <PostListProvider>
        <Layout></Layout>
    </PostListProvider>
  )
}

export default Main