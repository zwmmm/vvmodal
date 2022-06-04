import { Button, Modal } from 'antd'
import { antdModal, createGlobalModal, useModal } from 'vvmodal'

const SimpleModal = createGlobalModal(() => {
  // highlight-start
  const modal = useModal()
  // highlight-end

  return (
    <Modal {...antdModal(modal)} onOk={modal.hide}>
      使用vvmodal管理modal状态
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
