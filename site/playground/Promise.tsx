import { antdModal, createGlobalModal, useModal } from 'vvmodal'
import { Button, message, Modal } from 'antd'

const SimpleModal = createGlobalModal(() => {
  const modal = useModal()
  const handleOK = () => {
    modal.resolve()
    modal.hide()
  }
  return (
    <Modal {...antdModal(modal)} onOk={handleOK}>
      promise 方式结束
    </Modal>
  )
})

export default function App() {
  const open = () => {
    SimpleModal.show().then(() => {
      message.info('promise resolve')
    })
  }
  return (
    <Button type="primary" onClick={open}>
      点击展示
    </Button>
  )
}
