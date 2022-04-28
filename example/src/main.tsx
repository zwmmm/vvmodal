import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { UkyouProvider } from 'ukyou'
import 'antd/dist/antd.css'
import './index.css'
import {
  createGenerateClassName,
  StylesProvider,
  ThemeProvider
} from '@mui/styles'
import theme from './styles/theme'
import App from './App'
import { ThemeProvider as UIProvider } from 'theme-ui'
import ui from './theme/index'
import components from './theme/components'

const generateClassName = createGenerateClassName({
  seed: 'ukyou'
})
console.log(ui)
ReactDOM.render(
  <UIProvider theme={ui} components={components}>
    <ThemeProvider theme={theme}>
      <StylesProvider generateClassName={generateClassName}>
        <UkyouProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </UkyouProvider>
      </StylesProvider>
    </ThemeProvider>
  </UIProvider>,
  document.getElementById('root')
)
