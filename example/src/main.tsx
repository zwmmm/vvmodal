import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { UkyouProvider } from 'ukyou'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import theme from './theme/index'
import components from './theme/components'
import './index.less'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <ThemeProvider theme={theme} components={components}>
    <ConfigProvider locale={zhCN}>
      <UkyouProvider>
        <HashRouter>
          <App/>
        </HashRouter>
      </UkyouProvider>
    </ConfigProvider>
  </ThemeProvider>,
  document.getElementById('root')
)
