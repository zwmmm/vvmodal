import { cssd } from '../styles'
import config from '../config'

const PackageInfo = cssd('div')((props) => ({
  padding: '20px 0 10px 20px',
  backgroundColor: '#f0f0f0'
}))

const PackageTitle = cssd('div')((props) => ({
  fontWeight: 700,
  fontSize: 16,
  height: 40
}))

export default function () {
  return (
    <PackageInfo>
      <PackageTitle>{config.title}</PackageTitle>
    </PackageInfo>
  )
}
