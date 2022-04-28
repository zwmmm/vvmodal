import { cssd } from '../styles'

const Playground = cssd('div')((props) => ({
  backgroundColor: props.theme.primaryBgc,
  flex: 1,
  padding: 20
}))

export default Playground
