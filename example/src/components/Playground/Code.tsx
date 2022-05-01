import Prism from './Prism'
import { Language } from 'prism-react-renderer'

const modules = import.meta.glob('../../pages/**/*.tsx', { as: 'raw' })

export default function (props: { url: string }) {
  const { url } = props
  const dot = url.split('.').pop() as Language
  const fileContent = modules[`../../pages/${url}`] as unknown as string
  return <Prism className={dot}>{fileContent}</Prism>
}
