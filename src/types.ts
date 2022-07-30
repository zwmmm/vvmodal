import React from 'react'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface ModalComponentProps extends PlainObject {
  visible: boolean
  show: (props?: PlainObject) => void
  hide: () => void
  setDefaultArgs: (props: PlainObject) => void
}

export type UseModalProps<
  T = PlainObject,
  TResolve = any
> = ModalComponentProps & {
  resolve: VVModalPromiseType<TResolve>['resolve']
  reject: VVModalPromiseType['reject']
  destroy: () => void
} & T

export interface VVModalPromiseType<T = any> {
  resolve: (value?: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
  value: Promise<T>
}

export type DidModalCallback = () => void

export interface GlobalModalType {
  value: PlainObject<{
    visible: boolean
    args: PlainObject
  }>
  register: (key: string, payload?: PlainObject) => Promise<void>
  unregister: (key: string) => Promise<void>
}

export interface GlobalModalItem {
  key: string
  Comp: React.ComponentType
  args: PlainObject
}
