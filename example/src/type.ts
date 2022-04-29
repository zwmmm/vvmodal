import { RouteObject } from 'react-router-dom'

export interface FileType {
  title: string
  code: string
}

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface MenuItemType extends RouteObject {
  name: string
  path: string
}
