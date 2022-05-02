import { system } from '@theme-ui/presets'
import { merge } from 'theme-ui'

export default merge(system, {
  colors: {
    modes: {
      dark: {
        muted: '#303030',
        background: '#141414',
        highlight: '#2c2c29'
      }
    }
  },
  layout: {
    container: {
      maxWidth: 1180
    }
  },
  styles: {
    h1: {
      fontSize: 5,
      mb: 4,
      mt: 0
    },
    h2: {
      fontSize: 4,
      my: 4
    },
    h3: {
      fontSize: 3,
      my: 4
    },
    h4: {
      fontSize: 2,
      my: 4
    }
  }
})
