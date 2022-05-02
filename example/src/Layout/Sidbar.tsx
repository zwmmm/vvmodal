import { useLocation, useNavigate } from 'react-router-dom'
import { Box } from 'theme-ui'
import { ChapterType, RouteType } from '../type'
import React from 'react'

const SubMenu: React.FC<{
  title: string
  children: React.ReactNode
}> = (props) => {
  return (
    <>
      <Box
        pt={3}
        pb={1}
        sx={{
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {props.title}
      </Box>
      {props.children}
    </>
  )
}

const MenuItem: React.FC<RouteType> = (props) => {
  const { path, name } = props
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active = path === pathname
  const go = () => {
    navigate(path as string)
    window.scrollTo(0, 0)
  }
  return (
    <Box
      py={1}
      my={1}
      sx={{
        cursor: 'pointer',
        fontWeight: 'bold',
        color: active ? 'primary' : 'gray',
        borderRadius: 4
      }}
      key={name}
      onClick={go}
    >
      {name}
    </Box>
  )
}

export default function Sidbar(props: { chapters: ChapterType[] }) {
  return (
    <Box
      sx={{
        backgroundColor: (t) => t.colors?.background,
        pr: 3
      }}
    >
      <Box
        sx={{
          position: 'sticky',
          height: 'calc(100vh - 80px)',
          overflowY: 'auto',
          top: 80
        }}
      >
        {props.chapters.map((item) => {
          if (!item.path) {
            return (
              <SubMenu title={item.name} key={item.name}>
                {item?.children?.map((sub: RouteType) => (
                  <MenuItem path={sub.path} name={sub.name} key={sub.name} />
                ))}
              </SubMenu>
            )
          }
          return <MenuItem path={item.path} name={item.name} key={item.name} />
        })}
      </Box>
    </Box>
  )
}
