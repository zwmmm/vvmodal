import React from 'react'
import {
  CreateModalOptions,
  CreateModalType,
  DidShowCallbackType,
  PlainObject,
  UkyouPromiseType
} from './types'
import {
  UkyouModalProvider,
  useModal,
  useModalData,
  useModalShow
} from './modal'
import { activationModal, register, UkyouProvider } from './global'

export { useModal, useModalShow, UkyouProvider }

const defaultFunction = () => {
  console.error('请等Modal执行结束之后在调用')
}

const promiseMap = new Map<string, UkyouPromiseType>()

function createPromise(id: string): void {
  let resolve: UkyouPromiseType['resolve'] = () => {}
  let reject: UkyouPromiseType['reject'] = () => {}
  let value = new Promise((_resolve, _reject) => {
    reject = _reject
    resolve = _resolve
  })
  value.finally(() => {
    createPromise(id)
  })
  promiseMap.set(id, {
    value,
    reject,
    resolve
  })
}

let uidSeed = 0

export function createModal<T = any>(
  Comp: React.ComponentType<T>,
  options?: CreateModalOptions
): CreateModalType<T> {
  const _modal = {
    visible: false,
    show: (payload?: PlainObject) => {
      return new Promise(() => {})
    },
    hide: defaultFunction,
    updateArgs: (payload?: PlainObject) => {},
    didShowCallback: []
  }
  const ukyouId = `__ukyou__${uidSeed++}`
  createPromise(ukyouId)
  const Modal = (props: T) => {
    const modal = useModalData()
    Object.assign(_modal, modal)
    const promise = promiseMap.get(ukyouId) as UkyouPromiseType
    return (
      <UkyouModalProvider
        value={{
          ...modal,
          reject: promise.reject,
          resolve: promise.resolve
        }}
      >
        <Comp {...props} />
      </UkyouModalProvider>
    )
  }
  return {
    ukyouId,
    Modal,
    modal: _modal,
    show: (payload?: PlainObject) => {
      if (options?.global) {
        activationModal(ukyouId)
      }
      setTimeout(() => {
        _modal.show(payload)
        _modal.didShowCallback.forEach((cb: DidShowCallbackType) => cb())
      }, 0)
      return (promiseMap.get(ukyouId) as UkyouPromiseType).value
    },
    updateArgs(payload?: PlainObject) {
      _modal.updateArgs(payload)
    }
  }
}

export function createGlobalModal<T = any>(
  Comp: React.ComponentType<T>
): CreateModalType<T> {
  const res = createModal(Comp, { global: true })
  register(res.ukyouId, res.Modal)
  return res
}
