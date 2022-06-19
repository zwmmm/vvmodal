import React, { useRef } from 'react'
import { destroyModal, mountModal, register, VVModalProvider } from './global'
import {
  ModalProvider,
  useModal,
  useModalData,
  useModalHide,
  useModalShow
} from './modal'
import {
  CreateModalType,
  ModalComponentProps,
  PlainObject,
  UseModalProps,
  VVModalPromiseType
} from './types'

export { useModal, useModalShow, VVModalProvider, useModalHide }

const showCallbackMap = new Map<string, VVModalPromiseType>()

function createPromise<T = any>(): VVModalPromiseType<T> {
  let resolve!: VVModalPromiseType['resolve']
  let reject!: VVModalPromiseType['reject']
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
  const vvModalId = `__vvModal__${uidSeed++}`
  const Modal: React.FC<T> = React.memo(() => {
    const isRenderRef = useRef<boolean>(false)
    const modal = useModalData()
    Object.assign(_modal, modal)
    const promise = showCallbackMap.get(vvModalId) || createPromise<TValue>()
    if (!isRenderRef.current) {
      isRenderRef.current = true
      return null
    }
    const value: UseModalProps<TValue> = {
      ...modal,
      destroy: () => destroyModal(vvModalId),
      resolve: promise.resolve,
      reject: promise.reject
    }
    return (
      <ModalProvider value={value}>
        <Comp />
      </ModalProvider>
    )
  })
  return {
    vvModalId,
    Modal,
    modal: _modal,
    show: (payload?: T) => {
      const showCallback = createPromise<TValue>()
      showCallback.value.finally(() => {
        showCallbackMap.delete(vvModalId)
      })
      showCallbackMap.set(vvModalId, showCallback)
      mountModal(vvModalId).then(() => {
        _modal.show(payload)
      })
      return showCallback.value
    },
    hide: () => {
      _modal.hide()
    }
  }
}

export function createGlobalModal<T = any, TValue = any>(
  Comp: React.ComponentType
): CreateModalType<T, TValue> {
  const res = createModal<T>(Comp)
  register(res.vvModalId, res.Modal)
  return res
}

export const antdModal = (
  modal: UseModalProps
): {
  visible: UseModalProps['visible']
  onCancel: UseModalProps['hide']
  onOk: UseModalProps['hide']
} => {
  return {
    visible: modal.visible,
    onCancel: modal.hide,
    onOk: modal.hide
  }
}

export const antdDrawer = (
  modal: UseModalProps
): {
  visible: UseModalProps['visible']
  onClose: UseModalProps['hide']
} => {
  return {
    visible: modal.visible,
    onClose: modal.hide
  }
}
