import { VVModalProvider } from 'vvmodal'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import { useColorMode } from 'theme-ui'
import { Helmet } from 'react-helmet';
import { useMemo } from 'react'

function SwtichAntdTheme() {
  const [colorMode] = useColorMode()
  const antdTheme = useMemo(() => {
    return `/antd.${colorMode}.css`
  }, [colorMode])
  return (
    <Helmet>
      <link rel="stylesheet" href={antdTheme}/>
    </Helmet>
  )
}

export default function (props) {
  return (
    <ConfigProvider locale={zhCN} componentSize="small">
      <VVModalProvider>
        {props.children}
        <SwtichAntdTheme/>
      </VVModalProvider>
    </ConfigProvider>
  )
}
