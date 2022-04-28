import { cssd } from '../styles'

const Main = cssd('div')((props) => ({
  backgroundColor: props.theme.background,
  color: props.theme.color,
  minHeight: '100vh',
  fontSize: 14,
  display: 'flex'
}))

export default Main
