import { createGlobalModal, useModal, useModalShow } from 'vvmodal'
import { Form, Input, Modal, Spin } from 'antd'
import { useState } from 'react'
import axios from 'axios'

export default createGlobalModal<{
  id?: string
}>(() => {
  const modal = useModal()
  const [form] = Form.useForm()
  const submit = async () => {
    const data = await form.validateFields()
    modal.resolve({
      name: data.name,
      phone: data.phone
    })
    modal.hide()
  }
  const isEdit = !!modal.id
  const [loading, setLoading] = useState(false)
  useModalShow(async () => {
    if (isEdit) {
      setLoading(true)
      const data = await axios(
        `https://626be3b2e5274e6664d30f0b.mockapi.io/api/users/${modal.id}`
      ).then((res) => res.data)
      form.setFieldsValue(data)
      setLoading(false)
    } else {
      form.resetFields()
    }
  })
  return (
    <Modal
      title={isEdit ? '编辑' : '新增'}
      visible={modal.visible}
      onCancel={modal.hide}
      onOk={submit}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '请出入手机号' }]}
          >
            <Input/>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
})
