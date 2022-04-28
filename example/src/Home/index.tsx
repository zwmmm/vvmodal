import Index from './index.mdx'
import { useMDXComponents } from '@mdx-js/react'

export default function () {
  const components = useMDXComponents()
  console.log(components)
  return <Index components={components} />
}
