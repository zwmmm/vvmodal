import { system } from '@theme-ui/presets'
import { merge } from 'theme-ui'
import code from '@theme-ui/prism/presets/dracula.json'

export default merge(system, {
  config: {
    initialColorModeName: 'light'
  },
  styles: {
    code
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)'
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'muted'
    }
  }
})
