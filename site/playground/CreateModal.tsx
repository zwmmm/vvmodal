import { antdModal, createModal, useModal } from 'vvmodal'
import { Button, Modal } from 'antd'

const LocalModal = createModal(() => {
  const modal = useModal()
  return (
    <Modal {...antdModal(modal)} onOk={modal.hide}>
      基础弹窗
    </Modal>
  )
})

export default function () {
  return (
    <>
      <Button onClick={() => LocalModal.show()}>展示</Button>
      <LocalModal.Modal />
    </>
  )
}
