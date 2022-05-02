import Prism from './Prism'
import { Language } from 'prism-react-renderer'

const files = import.meta.glob('../../playground/*', { as: 'raw' })

export default function (props: { url: string }) {
  const { url } = props
  const dot = url.split('.').pop() as Language
  const fileContent = files[`../../playground/${url}`] as unknown as string
  return <Prism className={dot}>{fileContent}</Prism>
}
