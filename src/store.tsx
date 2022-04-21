import React, {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState
} from 'react'

export interface PlainObject<T = any> {
  [key: string]: T
}

export interface ModalState {
  [key: string]: {
    visible: boolean
    props: PlainObject
  }
}

export interface StoreValue {
  modalMap: ModalState
  show: (id: string, props: PlainObject) => void
  hide: (id: string) => void
}

const useStore = (initialState: ModalState): StoreValue => {
  const [modalMap, setModalMap] = useState(initialState || {})
  const show = useCallback((id: string, props: PlainObject) => {
    setModalMap((modalMap) => ({
      ...modalMap,
      [id]: {
        visible: true,
        props: props || {}
      }
    }))
  }, [])
  const hide = useCallback((id: string) => {
    setModalMap((modalMap) => ({
      ...modalMap,
      [id]: {
        visible: false,
        props: {}
      }
    }))
  }, [])
  return {
    modalMap,
    show,
    hide
  }
}

const Context = createContext<null | StoreValue>(null)

const Provider: FC<{ initialState: ModalState; children: ReactNode }> = (
  props
) => {
  const value = useStore(props.initialState)
  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

const useModal = (id: string) => {
  const context = useContext(Context)
  if (!context) {
    console.error(`useModal 使用错误，请在 Provider 内使用`)
    return {}
  }
  const { modalMap, show, hide } = context
  if (!modalMap[id]) {
    console.error(`model ${id} 不存在`)
    return {}
  }
  return {
    visible: modalMap[id].visible,
    props: modalMap[id].props,
    show: (props: PlainObject) => show(id, props),
    hide: () => hide(id)
  }
}

export { Provider, useModal }
