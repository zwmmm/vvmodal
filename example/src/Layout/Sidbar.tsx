import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { cssd } from '../styles'
import { routes } from '../routes'
import PackageInfo from './PackageInfo'

const Sidbar = cssd('div')((props) => ({
  height: '100vh',
  overflowY: 'auto',
  width: props.theme.sidbarWidth,
  backgroundColor: props.theme.primaryBgc
}))

const Menu = cssd('div')({
  padding: '8px 0'
})

const MenuItem = cssd('div')((props) => ({
  paddingLeft: '20px',
  cursor: 'pointer',
  height: 46,
  lineHeight: '46px',
  fontSize: 14,
  fontWeight: 700,
  '&.active': {
    color: props.theme.activeColor,
    backgroundColor: props.theme.activeBackground
  }
}))

export default function () {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <Sidbar>
      <PackageInfo />
      <Menu>
        {routes.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => navigate(item.path)}
            className={clsx({ active: item.path === pathname })}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Sidbar>
  )
}
