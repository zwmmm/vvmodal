import styled from '../theme/styled'
import Header from './Header'
import Routes from '../routes/routes'
import React from 'react'
import { Container } from 'theme-ui'
import BackTop from './BackTop'

const Main = styled('div', {
  backgroundColor: 'background',
  color: 'text',
  minHeight: '100vh',
  fontSize: 14
})

export default function () {
  return (
    <Main>
      <Header />
      <Container
        sx={{
          paddingTop: 80,
          paddingBottom: 4
        }}
      >
        <Routes />
        <BackTop />
      </Container>
    </Main>
  )
}
