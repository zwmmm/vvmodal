import React from 'react'
import Prism from '@theme-ui/prism'
import { Alert, Message } from 'theme-ui'
import Preview from '../components/Preview'

const components = {
  code: Prism,
  pre: (props: any) => props.children,
  Message,
  Alert,
  Preview
}

export default components
