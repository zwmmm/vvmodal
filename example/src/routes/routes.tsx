import React from 'react'
import Started from '../pages/Started/index.mdx'
import { useRoutes } from 'react-router-dom'

export const routes = [
  {
    name: '快速上手',
    path: '/',
    element: <Started />
  }
]

export default () => {
  return useRoutes(routes)
}
