import React from 'react'
import Prism from '../components/Preview/Prism'
import { Alert, Box, Message } from 'theme-ui'
import Preview from '../components/Preview'

const components = {
  code: Prism,
  pre: (props: any) => (
    <Box sx={{ margin: (r) => `${r.space?.[3]}px 0` }}>{props.children}</Box>
  ),
  Message,
  Alert,
  Preview
}

export default components
