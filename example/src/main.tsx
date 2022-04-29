import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { UkyouProvider } from 'ukyou'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import theme from './theme/index'
import components from './theme/components'

ReactDOM.render(
  <ThemeProvider theme={theme} components={components}>
    <UkyouProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </UkyouProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
