import { antdModal, createModal, useModal } from 'vvmodal'
import { Button, Modal } from 'antd'
import { forwardRef, useImperativeHandle } from 'react'

interface Props {
  title: string
}

const LocalModal = createModal<Props>(
  forwardRef<{ click: () => void }>((_props, ref) => {
    const modal = useModal<Props>()
    useImperativeHandle(ref, () => ({
      click() {
        console.log(11)
      }
    }))
    return (
      <Modal {...antdModal(modal)} onOk={modal.hide} title={modal.title}>
        基础弹窗
      </Modal>
    )
  })
)

export default function () {
  return (
    <>
      <Button onClick={() => LocalModal.ref.current.click()}>
        打开控制台查看打印
      </Button>
      <LocalModal.Modal />
    </>
  )
}
