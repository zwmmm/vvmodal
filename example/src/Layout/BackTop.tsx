import { Box } from 'theme-ui'
import BackTopIcon from '../components/Icons/BackTop'
import Space from './Space'

export default function BackTop() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  return (
    <Space
      sx={{
        position: 'fixed',
        bottom: 50,
        right: 50,
        zIndex: 2,
        cursor: 'pointer'
      }}
      onClick={handleScrollTop}
      direction="column"
    >
      <BackTopIcon size={30} />
      <Box>返回顶部</Box>
    </Space>
  )
}
