import { createModal, ModalComponentProps } from '../dist'
import React from 'react'

const Demo = createModal((props: ModalComponentProps) => {
  console.log(props.visible)
  return <div>111</div>
})

function f() {
  Demo.show()
  return (
    <Demo />
  )
}
