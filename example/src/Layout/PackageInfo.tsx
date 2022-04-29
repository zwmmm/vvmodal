import config from '../config'
import { Box, Flex, Themed, useColorMode } from 'theme-ui'
import { Moon, Sun } from '../components/Icons'

export default function () {
  const [colorMode, setColorMode] = useColorMode()

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
        onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
      >
        {colorMode === 'dark' ? <Sun/> : <Moon/>}
      </Box>
    </Flex>
  )
}
