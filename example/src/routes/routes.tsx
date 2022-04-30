import React from 'react'
import AntdModal from '../pages/AntdModal/index.mdx'
import Started from '../pages/Started/index.mdx'
import { useRoutes } from 'react-router-dom'

export const routes = [
  {
    name: '快速上手',
    path: '/',
    element: <Started />
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
