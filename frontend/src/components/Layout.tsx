import React from 'react'
import styled from 'styled-components'
import Header from './Header'

const Layout = () => {
  return (
    <>
        <SHeader>
            <Header></Header>
        </SHeader>
    </>
  )
}

const SHeader = styled.div`
    width: 100%;
    height: 32px;
    border: 2ox solid red;
`


export default Layout