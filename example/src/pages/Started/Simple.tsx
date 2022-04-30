import { antdModal, createGlobalModal, useModal } from 'ukyou'
import { Button, Modal } from 'antd'

const SimpleModal = createGlobalModal(() => {
  const modal = useModal()
  return (
    <Modal {...antdModal(modal)} onOk={modal.hide}>
      使用ukyou管理modal状态
    </Modal>
  )
})

export default function App() {
  return (
    <Button type="primary" onClick={() => SimpleModal.show()}>
      点击展示
    </Button>
  )
}
