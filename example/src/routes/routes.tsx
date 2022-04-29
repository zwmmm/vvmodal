import React from 'react'
import AntdModal from '../pages/AntdModal/index.mdx'
import Home from '../pages/Home/index.mdx'
import { useRoutes } from 'react-router-dom'

export const routes = [
  {
    name: '首页',
    path: '/',
    element: <Home />
  },
  {
    name: 'AntdModal',
    path: '/antd',
    element: <AntdModal />
  }
]

export default () => {
  return useRoutes(routes)
}
