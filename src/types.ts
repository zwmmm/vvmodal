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

export type ModalProps<
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
  register: (key: string, payload?: PlainObject) => void
  unregister: (key: string) => void
}

export interface GlobalModalItem {
  key: string
  Comp: React.ComponentType
  args: PlainObject
}

export interface MT<T = PlainObject, TResolve = any> {
  vvModalId: string
  ref: any
  Modal: React.ComponentType
  modal: ModalComponentProps
  show: (payload?: T) => Promise<TResolve>
  hide: () => void
  setDefaultArgs: (props: PlainObject) => void
}