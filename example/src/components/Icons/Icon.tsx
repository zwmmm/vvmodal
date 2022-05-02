import { BoxProps } from 'theme-ui'

export interface IconProps extends BoxProps {
  size?: number
}

export default function Icon(props: IconProps) {
  return (
    <svg
      className={props.className}
      sx={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {props.children}
    </svg>
  )
}

Icon.defaultProps = {
  size: 24
}
