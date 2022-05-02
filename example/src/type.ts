import { RouteObject } from 'react-router-dom'
import * as React from 'react'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface RouteType extends RouteObject {
  name: string
}

export interface ChapterType {
  name: string
  path?: string
  children?: ChapterType[]
}

export type ForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>

export interface ConfigType {
  title: string
  logo: string
  repository: string
  menus: Record<string, string>
  chapters: Record<string, ChapterType[]>
}
