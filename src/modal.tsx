import React, {
  createContext,
  useCallback,
  useContext, useEffect,
  useRef,
  useState
} from 'react'
import {DidShowCallbackType, ModalComponentProps, PlainObject, UseModalProps} from './types'

const defaultModalContext = Symbol('defaultModalContext')

const ModalContext = createContext<UseModalProps | typeof defaultModalContext>(
  defaultModalContext
)

export const useModalData = (): ModalComponentProps => {
  const [visible, setVisible] = useState(false)
  const args = useRef({})
  const didShowCallback = useRef<DidShowCallbackType[]>([])
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
  const pushDidShowCallback = useCallback((cb: DidShowCallbackType) => {
    didShowCallback.current.push(cb)
  }, [])

  return {
    ...args.current,
    visible,
    show,
    hide,
    updateArgs,
    didShowCallback: didShowCallback.current,
    pushDidShowCallback
  }
}

export function useModal(): UseModalProps {
  const context = useContext(ModalContext)
  if (context === defaultModalContext) {
    throw new Error('Component must be wrapped with <ModalContext.Provider>')
  }
  return context
}

export function useModalShow(cb: DidShowCallbackType) {
  const modal = useModal()
  useEffect(() => {
    modal.pushDidShowCallback(cb)
  }, [])
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
