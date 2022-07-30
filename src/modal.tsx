import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { DidModalCallback, PlainObject, UseModalProps } from './types'

const defaultModalContext = Symbol('defaultModalContext')

type DefaultModalContextType = typeof defaultModalContext

const ModalContext = createContext<UseModalProps | DefaultModalContextType>(
  defaultModalContext
)

export function useModalData<T = PlainObject>() {
  const [visible, setVisible] = useState(false)
  const args = useRef<T | PlainObject>({})
  const defaultArgs = useRef<T | PlainObject>({})
  const show = useCallback((props?: PlainObject) => {
    args.current = props || {}
    setVisible(true)
  }, [])
  const hide = useCallback(() => {
    setVisible(false)
  }, [])
  const setDefaultArgs = useCallback((val: PlainObject) => {
    defaultArgs.current = val
  }, [])

  return {
    ...args.current,
    ...defaultArgs.current,
    visible,
    show,
    hide,
    setDefaultArgs
  }
}

export function useModal<T = PlainObject, TResolve = any>(): UseModalProps<
  T,
  TResolve
> {
  const context = useContext(ModalContext)
  if (context === defaultModalContext) {
    throw new Error('Component must be wrapped with <ModalContext.Provider>')
  }
  return context as UseModalProps<T, TResolve>
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

export const ModalProvider = <T extends UseModalProps>(props: {
  value: T
  children: React.ReactChild
}) => {
  return (
    <ModalContext.Provider value={props.value}>
      {props.children}
    </ModalContext.Provider>
  )
}
