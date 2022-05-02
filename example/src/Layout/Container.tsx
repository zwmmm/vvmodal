import { Box, Grid } from 'theme-ui'
import { Outlet } from 'react-router-dom'
import Sidbar from './Sidbar'
import config from '../config'

export default function Container(props: { path: string }) {
  const chapters = config.chapters[props.path] || []
  return (
    <Grid gap={18} columns="180px minmax(0px, 3.5fr) minmax(0px, 15rem)">
      <Sidbar chapters={chapters} />
      <Box>
        <Outlet />
      </Box>
    </Grid>
  )
}
