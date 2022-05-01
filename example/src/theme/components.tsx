import React from 'react'
import Prism from '../components/Playground/Prism'
import { Alert, Box, Message } from 'theme-ui'
import Blockquote from '../components/Blockquote'
import Playground from '../components/Playground'

const components = {
  code: Prism,
  blockquote: Blockquote,
  pre: (props: any) => (
    <Box sx={{ margin: (r) => `${r.space?.[3]}px 0` }}>{props.children}</Box>
  ),
  Message,
  Alert,
  Playground
}

export default components
