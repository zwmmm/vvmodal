import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { UkyouProvider } from 'ukyou'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import theme from './theme/index'
import components from './theme/components'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <ThemeProvider theme={theme} components={components}>
    <ConfigProvider locale={zhCN} componentSize="small">
      <UkyouProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UkyouProvider>
    </ConfigProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
