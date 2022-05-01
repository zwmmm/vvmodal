import config from '../config'
import { Box, Flex, Themed, useColorMode } from 'theme-ui'
import { Moon, Sun } from '../components/Icons'
import { useEffect } from 'react'

export default function () {
  const [colorMode, setColorMode] = useColorMode()
  const toggleTheme = () => {
    const theme = colorMode === 'dark' ? 'light' : 'dark'
    setColorMode(theme)
  }
  useEffect(() => {
    const antdTheme = document.getElementById('antd-theme') as HTMLLinkElement
    antdTheme.href = `/antd.${colorMode}.css`
  }, [colorMode])
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 2
      }}
    >
      <Themed.h2>{config.title}</Themed.h2>
      <Box
        sx={{
          cursor: 'pointer'
        }}
        onClick={toggleTheme}
      >
        {colorMode === 'dark' ? <Sun/> : <Moon/>}
      </Box>
    </Flex>
  )
}
