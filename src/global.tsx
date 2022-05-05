import React, { memo, useCallback, useMemo, useState } from 'react'
import { GlobalModalItem, GlobalModalType, PlainObject } from './types'

const MODAL_REGISTRY = new Map()

export function register<T = any>(id: string, Comp: React.ComponentType<T>) {
  MODAL_REGISTRY.set(id, Comp)
}

export function unregister(id: string) {
  MODAL_REGISTRY.delete(id)
}

export function hasRegister(id: string) {
  return MODAL_REGISTRY.has(id)
}

export function getRegister(id: string) {
  return MODAL_REGISTRY.get(id)
}

export const defaultVVModalContext = Symbol('defaultVVModalContext')
const VVModalContext = React.createContext<
  GlobalModalType | typeof defaultVVModalContext
>(defaultVVModalContext)

export let mountModal: GlobalModalType['register'] = (key: string) =>
  Promise.resolve()
export let destroyModal: GlobalModalType['unregister'] = (key: string) =>
  Promise.resolve()

export function VVModalProvider(props: React.ComponentProps<any>) {
  const value = useGlobalModalData()
  mountModal = value.register
  destroyModal = value.unregister
  return (
    <VVModalContext.Provider value={value}>
      {props.children}
      <VVModalPlaceholder />
    </VVModalContext.Provider>
  )
}

export const VVModalPlaceholder = memo(() => {
  const globalModal = useGlobalModal()
  const toRender: GlobalModalItem[] = useMemo(() => {
    const item: GlobalModalItem[] = []
    Object.entries(globalModal.value).forEach(([key, value]) => {
      if (value.visible && hasRegister(key)) {
        item.push({
          key,
          Comp: getRegister(key),
          args: value.args
        })
      }
    })
    return item
  }, [globalModal.value])
  return (
    <>
      {toRender.map((item) => (
        <item.Comp key={item.key} {...item.args} />
      ))}
    </>
  )
})

export function useGlobalModal() {
  const context = React.useContext(VVModalContext)
  if (context === defaultVVModalContext) {
    throw new Error('Component must be wrapped with <VVModalContext.Provider>')
  }
  return context
}

export function useGlobalModalData(): GlobalModalType {
  const [value, setValue] = useState({})
  const register = useCallback((key: string, args?: PlainObject) => {
    setValue((val) => ({
      ...val,
      [key]: {
        visible: true,
        args: args || {}
      }
    }))
    return Promise.resolve()
  }, [])
  const unregister = useCallback((key: string) => {
    setValue((val) => ({
      ...val,
      [key]: {
        visible: false,
        args: {}
      }
    }))
    return Promise.resolve()
  }, [])
  return {
    value,
    register,
    unregister
  }
}
