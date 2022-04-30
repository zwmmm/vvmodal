import React, { useRef } from 'react'
import {
  CreateModalType,
  ModalComponentProps,
  PlainObject,
  UkyouPromiseType,
  UseModalProps
} from './types'
import {
  UkyouModalProvider,
  useModal,
  useModalData,
  useModalHide,
  useModalShow
} from './modal'
import { destroyModal, mountModal, register, UkyouProvider } from './global'

export { useModal, useModalShow, UkyouProvider, useModalHide }

const showCallbackMap = new Map<string, UkyouPromiseType>()

function createPromise<T = any>(): UkyouPromiseType<T> {
  let resolve!: UkyouPromiseType['resolve']
  let reject!: UkyouPromiseType['reject']
  let value = new Promise<T>((_resolve, _reject) => {
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

export function createModal<T = PlainObject, TValue = any>(
  Comp: React.ComponentType
): CreateModalType<T, TValue> {
  const _modal: Omit<ModalComponentProps, 'pushDidShowCallback'> = {
    visible: false,
    show: () => {
      throw new Error('show方法使用错误，请先加载组件')
    },
    hide: () => {
      throw new Error('hide方法使用错误，请先加载组件')
    }
  }
  const ukyouId = `__ukyou__${uidSeed++}`
  const Modal: React.FC<T> = React.memo(() => {
    const isRenderRef = useRef<boolean>(false)
    const modal = useModalData()
    Object.assign(_modal, modal)
    const promise = showCallbackMap.get(ukyouId) || createPromise<TValue>()
    if (!isRenderRef.current) {
      isRenderRef.current = true
      return null
    }
    const value: UseModalProps<TValue> = {
      ...modal,
      destroy: () => destroyModal(ukyouId),
      resolve: promise.resolve,
      reject: promise.reject
    }
    return (
      <UkyouModalProvider value={value}>
        <Comp />
      </UkyouModalProvider>
    )
  })
  return {
    ukyouId,
    Modal,
    modal: _modal,
    show: (payload?: T) => {
      const showCallback = createPromise<TValue>()
      showCallback.value.finally(() => {
        showCallbackMap.delete(ukyouId)
      })
      showCallbackMap.set(ukyouId, showCallback)
      mountModal(ukyouId).then(() => {
        _modal.show(payload)
      })
      return showCallback.value
    }
  }
}

export function createGlobalModal<T = any, TValue = any>(
  Comp: React.ComponentType
): CreateModalType<T, TValue> {
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
