import { antdModal, createModal, useModal } from 'vvmodal'
import { Button, Modal } from 'antd'

interface Props {
  title: string
}

const LocalModal = createModal<Props, { a: string }>(() => {
  const modal = useModal<Props, { a: string }>()
  return (
    <Modal {...antdModal(modal)} onOk={modal.hide} title={modal.title}>
      基础弹窗
    </Modal>
  )
})

export default function () {
  return (
    <>
      <Button onClick={() => LocalModal.show({ title: '自定义名称' })}>
        展示
      </Button>
      <LocalModal.Modal />
    </>
  )
}
