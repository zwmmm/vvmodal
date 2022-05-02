import { Box, BoxProps, Container, Image, useColorMode } from 'theme-ui'
import config from '../config'
import { Moon, Sun } from '../components/Icons'
import { useEffect } from 'react'
import Space from './Space'
import { useNavigate } from 'react-router-dom'

const menus = Object.entries(config.menus).map(([path, name]) => ({
  name,
  path
}))

function SwitchTheme(props: BoxProps) {
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
    <Box
      sx={{
        cursor: 'pointer',
        ...props.sx
      }}
      onClick={toggleTheme}
    >
      {colorMode === 'dark' ? <Sun /> : <Moon />}
    </Box>
  )
}

function CodeRepository(props: BoxProps) {
  const repository = config.repository
  return (
    <a
      className={props.className}
      sx={props.sx}
      href={`https://github.com/${repository}`}
    >
      <img
        src={`https://img.shields.io/github/stars/${repository}?style=social`}
        alt="Github Repo"
      />
    </a>
  )
}

export default function () {
  const navigate = useNavigate()
  const jumpNav = (path: string) => {
    const matched = path.match(/^http/)
    if (matched) {
      window.open(path)
    } else {
      navigate(path)
    }
  }
  return (
    <Box
      sx={{
        backgroundColor: 'highlight',
        fontSize: 1,
        fontWeight: 'bold',
        position: 'fixed',
        zIndex: 100,
        width: '100%'
      }}
    >
      <Container
        sx={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Space onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          <Image src={config.logo} alt="" />
          <Box>{config.title}</Box>
        </Space>
        <Space>
          {menus.map((item) => (
            <Box
              px={1}
              sx={{
                cursor: 'pointer'
              }}
              key={item.path}
              onClick={() => jumpNav(item.path)}
            >
              {item.name}
            </Box>
          ))}
          <SwitchTheme />
        </Space>
      </Container>
    </Box>
  )
}
