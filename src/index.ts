import React, { useRef, useState } from 'react'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface ModalProps extends PlainObject {
  visible: boolean
  show: (props?: PlainObject) => void
  hide: () => void
}

export type ModalType = ModalProps | React.ComponentType

export const useModal = (): ModalProps => {
  const [visible, setVisible] = useState(false)
  const args = useRef({})
  const show = (props?: PlainObject) => {
    args.current = props || {}
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }

  return {
    ...args.current,
    visible,
    show,
    hide
  }
}

export const createModal = <T = any>(Comp: React.ComponentType<ModalProps | T>): ModalType => {
  const Modal = () => {
    const modal = useModal()
    Object.assign(Modal, modal)
    return React.createElement(Comp, modal)
  }
  return Modal
}
