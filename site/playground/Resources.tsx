import { useAntdTable } from 'ahooks'
import { Button, Form, Input, Space, Table } from 'antd'
import Detail from './ResourcesModal'
import axios from 'axios'

export default function () {
  const [form] = Form.useForm()
  const { tableProps, refresh, search } = useAntdTable(
    async ({ current, pageSize }, params) => {
      const res = await axios(
        'https://626be3b2e5274e6664d30f0b.mockapi.io/api/users',
        {
          params: {
            ...params,
            sortBy: 'createdAt',
            order: 'desc',
            page: current,
            limit: pageSize
          }
        }
      )
      return res.data
    },
    {
      form,
      defaultParams: [{ current: 1, pageSize: 10 }, {}]
    }
  )
  const { submit, reset } = search
  // highlight-start
  const editUser = async (id: string) => {
    const user = await Detail.show({
      id
    })
    await axios.put(
      `https://626be3b2e5274e6664d30f0b.mockapi.io/api/users/${id}`,
      {
        name: user.name,
        phone: user.phone
      }
    )
    refresh()
  }
  // highlight-end

  // highlight-start
  const handleAdd = async () => {
    const user = await Detail.show()
    await axios.post(`https://626be3b2e5274e6664d30f0b.mockapi.io/api/users`, {
      name: user.name,
      phone: user.phone
    })
    refresh()
  }
  // highlight-end

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '操作',
      dataIndex: 'id',
      render(id: string) {
        return (
          <Button type="primary" onClick={() => editUser(id)}>
            编辑
          </Button>
        )
      }
    }
  ]
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Form form={form} layout="inline">
        <Form.Item>
          <Button type="primary" onClick={handleAdd}>
            新增
          </Button>
        </Form.Item>
        <Form.Item label="" name="name">
          <Input.Search placeholder="搜索用户" onSearch={submit} />
        </Form.Item>
      </Form>
      <Table {...tableProps} columns={columns} rowKey="id" />
    </Space>
  )
}
