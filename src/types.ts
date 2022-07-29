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

export type CreateModalType<T, TValue = any, TReturn = PlainObject> = {
  vvModalId: string
  Modal: React.FC
  modal: Omit<ModalComponentProps, 'didShowCallback' | 'pushDidShowCallback'>
  show: (payload?: T) => Promise<TValue>
  hide: ModalComponentProps['hide']
} & TReturn

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

export type MergeType<T1, T2> = T1 | T2
