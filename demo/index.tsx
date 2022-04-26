import { createModal, useModal } from '../dist'
import React from 'react'

const Demo = createModal((props) => {
  const modal = useModal()
  console.log(modal.visible);
  return <div>111</div>
})

function f() {
  Demo.show()
  return (
    <Demo.Modal />
  )
}
