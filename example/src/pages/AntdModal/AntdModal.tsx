import { antdModal, createGlobalModal, useModal } from 'ukyou'
import { Modal } from 'antd'

export default createGlobalModal<{
  title: string
  demo: {
    a: '1'
  }
}>(() => {
  const modal = useModal()
  return <Modal {...antdModal(modal)}>
    <div>测试</div>
    <div>{modal.title}</div>
    <div>{modal.demo.a}</div>
  </Modal>
})
