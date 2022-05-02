import { Box, BoxProps } from 'theme-ui'
import React from 'react'
import { ForwardRef } from '../type'

interface SpaceProps extends BoxProps {
  align?: 'start' | 'end' | 'center' | 'baseline'
  direction?: 'row' | 'column'
}

const Space: ForwardRef<HTMLElement, SpaceProps> = React.forwardRef(
  (props: SpaceProps, ref) => {
    return (
      <Box
        {...props}
        className={props.className}
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: props.direction,
          alignItems: props.align,
          ...props.sx
        }}
      >
        {React.Children.map(props.children, (item: any, i) => {
          return React.cloneElement(item, {
            key: i,
            sx: {
              [props.direction === 'row' ? 'ml' : 'mt']: i <= 0 ? 0 : 2
            }
          })
        })}
      </Box>
    )
  }
)

Space.defaultProps = {
  direction: 'row',
  align: 'center'
}

export default Space
