import { styled } from '@mui/styles'
import * as React from 'react'
import {
  CreateCSSProperties,
  StyledComponentProps,
  WithStylesOptions
} from '@mui/styles/withStyles'
import { DistributiveOmit, Overwrite } from '@mui/types'
import { StyledComponent } from '@mui/styles/styled/styled'
import { ThemeType } from './theme'

export type ComponentCreator<Component extends React.ElementType> = <
  Theme = ThemeType,
  Props extends {} = React.ComponentPropsWithoutRef<Component>
>(
  styles:
    | CreateCSSProperties<Props>
    | ((props: { theme: Theme } & Props) => CreateCSSProperties<Props>),
  options?: WithStylesOptions<Theme>
) => StyledComponent<
  DistributiveOmit<
    JSX.LibraryManagedAttributes<Component, React.ComponentProps<Component>>,
    'classes' | 'className'
  > &
    StyledComponentProps<'root'> &
    Overwrite<Props, { className?: string; theme?: Theme }>
>

export default function <Component extends React.ElementType>(
  comp: Component
): ComponentCreator<Component> {
  return styled(comp)
}
