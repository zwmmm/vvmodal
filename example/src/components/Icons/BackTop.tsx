import Icon, { IconProps } from './Icon'

export default function BackTop(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="16 12 12 8 8 12"></polyline>
      <line x1="12" y1="16" x2="12" y2="8"></line>
    </Icon>
  )
}
