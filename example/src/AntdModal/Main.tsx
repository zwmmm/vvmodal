import { Button } from 'antd'
import AntdModal from './AntdModal'

export default function () {
  const handleClick = () => {
    AntdModal.show({
      demo: {
        a: '1'
      },
      title: 'fd'
    })
  }
  return <Button onClick={handleClick}>展示</Button>
}
