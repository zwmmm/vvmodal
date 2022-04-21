import { ModalState, Provider, useModal } from './store'
import {
  cloneElement,
  ComponentProps,
  ComponentType,
  DetailedHTMLProps,
  FC
} from 'react'

const Modal: FC<{
  name: string
  component: DetailedHTMLProps<any, HTMLElement>
}> = (props) => {
  const { name, component } = props
  const { visible, show, hide, props: modalProps } = useModal(name)
  return cloneElement(component, { ...modalProps, visible, show, hide })
}

export const connect = (
  Comp: ComponentType,
  modalMap: {
    [key: string]: ComponentType
  }
) => {
  const initialState: ModalState = Object.keys(modalMap).reduce(
    (all, item) => ({
      ...all,
      [item]: {
        visible: false,
        props: {}
      }
    }),
    {}
  )
  return (props: ComponentProps<any>) => (
    <Provider initialState={initialState}>
      <Comp {...props} />
      {Object.entries(modalMap).map(([id, Component]) => {
        return <Modal name={id} component={<Component />} key={id} />
      })}
    </Provider>
  )
}

export { useModal }
