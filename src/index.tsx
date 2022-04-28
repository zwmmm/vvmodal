import React, {useState, useEffect} from 'react'
import {
  CreateModalType,
  DidShowCallbackType,
  PlainObject,
  UkyouPromiseType,
  UseModalProps
} from './types'
import {
  UkyouModalProvider,
  useModal,
  useModalData,
  useModalShow
} from './modal'
import { destroyModal, mountModal, register, UkyouProvider } from './global'

export { useModal, useModalShow, UkyouProvider }

const defaultFunction = () => {
  console.error('请等Modal执行结束之后在调用')
}

const showCallbackMap = new Map<string, UkyouPromiseType>()

function createPromise(): UkyouPromiseType {
  let resolve: UkyouPromiseType['resolve'] = () => {}
  let reject: UkyouPromiseType['reject'] = () => {}
  let value = new Promise((_resolve, _reject) => {
    reject = _reject
    resolve = _resolve
  })
  return {
    value,
    reject,
    resolve
  }
}

let uidSeed = 0

export function createModal<T = PlainObject>(
  Comp: React.ComponentType
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
  const Modal: React.FC<T> = () => {
    const [isRender, setRender] = useState(false)
    const modal = useModalData()
    Object.assign(_modal, modal)
    const promise = showCallbackMap.get(ukyouId) || createPromise()
    useEffect(() => {
      setRender(true)
    }, [])
    if (!isRender) {
      return null
    }
    return (
      <UkyouModalProvider
        value={{
          ...modal,
          destroy: () => destroyModal(ukyouId),
          reject: promise?.reject,
          resolve: promise?.resolve
        }}
      >
        <Comp />
      </UkyouModalProvider>
    )
  }
  return {
    ukyouId,
    Modal,
    modal: _modal,
    show: (payload?: T) => {
      mountModal(ukyouId)
      const showCallback = createPromise()
      // promise 结束之后删除 释放内存
      showCallback.value.finally(() => {
        showCallbackMap.delete(ukyouId)
      })
      showCallbackMap.set(ukyouId, showCallback)
      setTimeout(() => {
        _modal.show(payload)
        _modal.didShowCallback.forEach((cb: DidShowCallbackType) => cb())
      }, 0)
      return showCallback.value
    },
    updateArgs(payload?: PlainObject) {
      _modal.updateArgs(payload)
    }
  }
}

export function createGlobalModal<T = any>(
  Comp: React.ComponentType
): CreateModalType<T> {
  const res = createModal<T>(Comp)
  register(res.ukyouId, res.Modal)
  return res
}

export const antdModal = (
  modal: UseModalProps
): {
  visible: UseModalProps['visible']
  onCancel: UseModalProps['hide']
  afterClose: UseModalProps['destroy']
} => {
  return {
    visible: modal.visible,
    onCancel: modal.hide,
    afterClose: modal.destroy
  }
}

export const antdDrawer = (
  modal: UseModalProps
): {
  visible: UseModalProps['visible']
  onClose: UseModalProps['hide']
  afterVisibleChange: (visible: boolean) => void
} => {
  return {
    visible: modal.visible,
    onClose: modal.hide,
    afterVisibleChange: (visible: boolean) => {
      visible || modal.destroy()
    }
  }
}
