import React, { useCallback, useMemo, useState } from 'react'
import { GlobalModalItem, GlobalModalType } from './types'

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

export const defaultUkyouContext = Symbol('defaultUkyouContext')
const UkyouContext = React.createContext<
  GlobalModalType | typeof defaultUkyouContext
>(defaultUkyouContext)

export let activationModal: GlobalModalType['register']

export function UkyouProvider(props: React.ComponentProps<any>) {
  const value = useGlobalModalData()
  activationModal = value.register
  return (
    <UkyouContext.Provider value={value}>
      {props.children}
      <UkyouPlaceholder />
    </UkyouContext.Provider>
  )
}

export function UkyouPlaceholder() {
  const globalModal = useGlobalModal()
  const toRender: GlobalModalItem[] = useMemo(() => {
    const value: GlobalModalItem[] = []
    Object.entries(globalModal.value).forEach(([key, show]) => {
      if (show && hasRegister(key)) {
        value.push({
          key,
          Comp: getRegister(key)
        })
      }
    })
    return value
  }, [globalModal.value])
  console.log(toRender, 'toRender')
  return (
    <>
      {toRender.map((item) => (
        <item.Comp key={item.key} />
      ))}
    </>
  )
}

export function useGlobalModal() {
  const context = React.useContext(UkyouContext)
  if (context === defaultUkyouContext) {
    throw new Error('Component must be wrapped with <UkyouContext.Provider>')
  }
  return context
}

export function useGlobalModalData(): GlobalModalType {
  const [value, setValue] = useState({})
  const register = useCallback((key: string) => {
    setValue((val) => ({ ...val, [key]: true }))
  }, [])
  const unregister = useCallback((key: string) => {
    setValue((val) => ({ ...val, [key]: false }))
  }, [])
  return {
    value,
    register,
    unregister
  }
}
