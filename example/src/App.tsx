import Routes from './routes'
import Main from './Layout/Main'
import Sidbar from './Layout/Sidbar'
import Content from './Layout/Content'
import React from 'react'

export default function () {
  return (
    <Main>
      <Sidbar />
      <Content>
        <Routes />
      </Content>
    </Main>
  )
}
