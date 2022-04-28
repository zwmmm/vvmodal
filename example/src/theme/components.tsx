import React from 'react'
import Prism from '@theme-ui/prism'
import Note from './Note'

const components = {
  code: Prism,
  pre: (props: any) => props.children,
  Note
}

export default components
