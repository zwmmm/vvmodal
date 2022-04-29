import React from 'react'
import { jsx } from 'theme-ui'
import { ThemeUIStyleObject } from '@theme-ui/core'
import { PlainObject } from '../type'

type CreateThemeUIStyleObject<T = PlainObject> = (
  props: T
) => ThemeUIStyleObject

function Styled(
  Comp: Parameters<typeof React.createElement>['0'],
  sx?: ThemeUIStyleObject | CreateThemeUIStyleObject
) {
  return function (props: React.ComponentProps<any>) {
    let sxValue = sx
    if (typeof sx === 'function') {
      sxValue = sx(props)
    }
    return jsx(Comp, {
      ...props,
      sx: {
        ...sxValue,
        ...props.sx
      }
    })
  }
}

export default Styled
