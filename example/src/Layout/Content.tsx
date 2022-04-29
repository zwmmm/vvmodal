import styled from '../theme/styled'
import config from '../config'

const Content = styled('div', {
  padding: '40px',
  width: `calc(100vw - ${config.sidbarWidth}px)`
})

export default Content
