import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  DidModalCallback,
  ModalComponentProps,
  PlainObject,
  UseModalProps
} from './types'

const defaultModalContext = Symbol('defaultModalContext')

const ModalContext = createContext<UseModalProps | typeof defaultModalContext>(
  defaultModalContext
)

export const useModalData = (props?: PlainObject): ModalComponentProps => {
  const [visible, setVisible] = useState(false)
  const args = useRef(props || {})
  const show = useCallback((props?: PlainObject) => {
    args.current = props || {}
    setVisible(true)
  }, [])
  const hide = useCallback(() => {
    setVisible(false)
  }, [])

  return {
    ...args.current,
    visible,
    show,
    hide
  }
}

export function useModal(): UseModalProps {
  const context = useContext(ModalContext)
  if (context === defaultModalContext) {
    throw new Error('Component must be wrapped with <ModalContext.Provider>')
  }
  return context
}

export function useModalShow(cb: DidModalCallback) {
  const modal = useModal()
  useEffect(() => {
    modal.visible && cb()
  }, [modal.visible])
}

export function useModalHide(cb: DidModalCallback) {
  const modal = useModal()
  useEffect(() => {
    modal.visible || cb()
  }, [modal.visible])
}

export const UkyouModalProvider: React.FC<{
  value: UseModalProps
  children: React.ReactChild
}> = (props) => {
  return (
    <ModalContext.Provider value={props.value}>
      {props.children}
    </ModalContext.Provider>
  )
}
