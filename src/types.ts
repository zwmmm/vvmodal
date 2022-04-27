import React from 'react'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface ModalComponentProps extends PlainObject {
  visible: boolean
  show: (props?: PlainObject) => void
  hide: () => void
  updateArgs: (payload?: PlainObject) => void
  didShowCallback: DidShowCallbackType[],
  pushDidShowCallback: (cb: DidShowCallbackType) => void
}

export interface UseModalProps extends ModalComponentProps {
  resolve: <T = any>(value?: T | PromiseLike<T>) => void,
  reject: UkyouPromiseType['reject']
  destroy: () => void
}

export interface CreateModalType<T> {
  ukyouId: string
  Modal: React.ComponentType<T>
  modal: Omit<ModalComponentProps, 'didShowCallback' | 'pushDidShowCallback'>
  show: (payload?: T) => Promise<any>,
  updateArgs: (payload?: T) => void,
}

export interface UkyouPromiseType<T = any> {
  resolve: (value?: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void
  value: Promise<T>
}

export type DidShowCallbackType = ()  => void

export interface GlobalModalType {
  value: PlainObject<{
    visible: boolean,
    args: PlainObject
  }>,
  register: (key: string, payload?: PlainObject) => void,
  unregister: (key: string) => void,
}

export interface GlobalModalItem {
  key: string
  Comp: React.ComponentType,
  args: PlainObject
}

export interface CreateModalOptions {
  global?: boolean
}
