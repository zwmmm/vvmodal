import React from 'react'
import AntdModal from './AntdModal/index'
import Home from './Home/index'
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
