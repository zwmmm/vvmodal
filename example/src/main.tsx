import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UkyouProvider } from "ukyou";
import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UkyouProvider>
      <App />
    </UkyouProvider>
  </React.StrictMode>
)
