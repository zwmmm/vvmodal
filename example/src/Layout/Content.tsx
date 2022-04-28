import { cssd } from '../styles'

const Content = cssd('div')((props) => ({
  padding: '40px',
  width: `calc(100vw - ${props.theme.sidbarWidth}px)`
}))

export default Content
