import React from 'react'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface ModalComponentProps extends PlainObject {
  visible: boolean
  show: (props?: PlainObject) => void
  hide: () => void
}

export interface UseModalProps<T = any> extends ModalComponentProps {
  resolve: VVModalPromiseType<T>['resolve']
  reject: VVModalPromiseType['reject']
  destroy: () => void
}

export interface CreateModalType<T, TValue> {
  vvModalId: string
  Modal: React.ComponentType<T>
  modal: Omit<ModalComponentProps, 'didShowCallback' | 'pushDidShowCallback'>
  show: (payload?: T) => Promise<TValue>
}

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
