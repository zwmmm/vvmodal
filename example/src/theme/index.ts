import {system} from '@theme-ui/presets'
import code from '@theme-ui/prism/presets/dracula.json'
import merge from 'deepmerge'

export default merge(system, {
  styles: {
    code
  },
  colors: {
    primary: '#3333ee'
  },
  highlight: '#efeffe'
})
