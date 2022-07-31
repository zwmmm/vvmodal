import React, { createRef } from 'react'
import { destroyModal, mountModal, register, VVModalProvider } from './global'
import {
  ModalProvider,
  useModal,
  useModalData,
  useModalHide,
  useModalShow
} from './modal'
import {
  ModalComponentProps,
  ModalProps,
  MT,
  PlainObject,
  VVModalPromiseType
} from './types'

export { useModal, useModalShow, VVModalProvider, useModalHide, MT, ModalProps }

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

export function createModal<T = PlainObject, TResolve = any, TRef = any>(
  Comp: React.ComponentType | React.ForwardRefRenderFunction<any, TRef>
) {
  const _modal: ModalComponentProps = {
    visible: false,
    show: () => {
      throw new Error('show方法使用错误，请先加载组件')
    },
    hide: () => {
      throw new Error('hide方法使用错误，请先加载组件')
    },
    setDefaultArgs: () => {
      throw new Error('setDefaultArgs方法使用错误，请先加载组件')
    }
  }
  const vvModalId = `__vvModal__${uidSeed++}`
  const ref = createRef<TRef>()
  const Modal: React.FC = () => {
    const modal = useModalData()
    Object.assign(_modal, modal)
    const promise = showCallbackMap.get(vvModalId) || createPromise()
    const value = {
      ...modal,
      destroy: () => destroyModal(vvModalId),
      resolve: promise.resolve,
      reject: promise.reject
    }
    // @ts-ignore
    const isForwardRef = Comp?.$$typeof === Symbol.for('react.forward_ref')
    return (
      <ModalProvider value={value}>
        {/* @ts-ignore */}
        {isForwardRef ? <Comp ref={ref} /> : <Comp />}
      </ModalProvider>
    )
  }
  return {
    vvModalId,
    ref,
    Modal,
    modal: _modal,
    show: (payload?: T): Promise<TResolve> => {
      const showCallback = createPromise()
      showCallback.value.finally(() => {
        showCallbackMap.delete(vvModalId)
      })
      showCallbackMap.set(vvModalId, showCallback)
      if (mountModal) {
        mountModal(vvModalId).then(() => {
          _modal.show(payload)
        })
      } else {
        _modal.show(payload)
      }
      return showCallback.value
    },
    hide: () => {
      _modal.hide()
    },
    setDefaultArgs: (props: T) => {
      _modal?.setDefaultArgs(props)
    }
  }
}

export function createGlobalModal<T = PlainObject, TResolve = any, TRef = any>(
  Comp: React.ComponentType | React.ForwardRefRenderFunction<T, TRef>
) {
  const res = createModal<T, TResolve, TRef>(Comp)
  register(res.vvModalId, res.Modal)
  return res
}

export const antdModal = (
  modal: ModalProps
): {
  visible: ModalProps['visible']
  onCancel: ModalProps['hide']
  onOk: ModalProps['hide']
} => {
  return {
    visible: modal.visible,
    onCancel: modal.hide,
    onOk: modal.hide
  }
}

export const antdDrawer = (
  modal: ModalProps
): {
  visible: ModalProps['visible']
  onClose: ModalProps['hide']
} => {
  return {
    visible: modal.visible,
    onClose: modal.hide
  }
}
