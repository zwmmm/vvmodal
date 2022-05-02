import React from 'react'
import { useRoutes } from 'react-router-dom'
import Container from '../Layout/Container'

const pages = import.meta.globEager('../docs/**/*.mdx')

const _routes = Object.entries(pages).map(([path, { default: Element }]) => {
  const _path = path
    .replace('../docs/', '')
    .replace('.mdx', '')
    .replaceAll('index', '')
    .split('/')
  return {
    element: <Element />,
    parentPath: _path[0] || '/',
    path: _path[1]
  }
})

const parentPathCounts = _routes.reduce((all: any, item) => {
  if (all[item.parentPath]) {
    all[item.parentPath]++
  } else {
    all[item.parentPath] = 1
  }
  return all
}, {})

const routes = Object.entries(parentPathCounts).map(([parentPath, count]) => {
  if (count === 1) {
    const route = _routes.find(
      (route) => route.parentPath === parentPath
    ) as any
    return {
      path: parentPath,
      element: route.element
    }
  } else {
    const routes = _routes.filter(
      (route) => route.parentPath === parentPath
    ) as any
    return {
      path: parentPath,
      element: <Container path={parentPath} />,
      children: routes
    }
  }
})

console.log(routes, 'routes')

export default () => {
  return useRoutes(routes)
}
