import React from 'react'
import styled from 'styled-components'
import Header from './Header'
import SideBar from './SideBar'
import Contents from './Contents'

const Layout = () => {
  return (
    <>
        <SHeader>
            <Header></Header>
        </SHeader>
        <SBody>
          <SSideBar>
            <SideBar></SideBar>
          </SSideBar>
          <SContents>
            <Contents></Contents>
          </SContents>
        </SBody>
    </>
  )
}

const SHeader = styled.div`
    width: 100%;
    height: 32px;
    border: 2px solid red;
`
const SBody = styled.div`
    width: 100%;
    height: calc(100vh - 32px);
    border: 2px solid green;
    display: flex;
    flex-direction: row;
`
const SSideBar = styled.div`
    border: 2px solid blue;
    width: 30%;
    height: 100%;
`

const SContents = styled.div`
    border: 2px solid #ff00ff;
    width: 100%;
    height: 100%;
`

export default Layout