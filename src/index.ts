import React, { useCallback, useRef, useState } from 'react'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface ModalComponentProps extends PlainObject {
  visible: boolean
  show: (props?: PlainObject) => void
  hide: () => void
  updateArgs: (payload?: PlainObject) => void
}

export interface ModalComponent
  extends React.FunctionComponent,
    ModalComponentProps {}

export const useModal = (): ModalComponentProps => {
  const [visible, setVisible] = useState(false)
  const args = useRef({})
  const show = useCallback((props?: PlainObject) => {
    args.current = props || {}
    setVisible(true)
  }, [])
  const hide = useCallback(() => {
    setVisible(false)
  }, [])
  const updateArgs = useCallback((payload?: PlainObject) => {
    Object.assign(args.current, payload)
  }, [])

  return {
    ...args.current,
    visible,
    show,
    hide,
    updateArgs
  }
}

const defaultFunction = () => {
  console.error('请等Modal执行结束之后在调用')
}

export const createModal = <T = any>(
  Comp: React.ComponentType<ModalComponentProps | T>
) => {
  const Modal: ModalComponent = (props: PlainObject) => {
    const modal = useModal()
    Object.assign(Modal, modal)
    return React.createElement(Comp, {
      ...props,
      ...modal
    })
  }
  Modal.visible = false
  Modal.show = defaultFunction
  Modal.hide = defaultFunction
  Modal.updateArgs = defaultFunction
  return Modal
}
