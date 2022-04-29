import config from '../config'
import { Box, Themed } from 'theme-ui'

export default function () {
  return (
    <Box
      sx={{
        padding: '20px 0 10px 20px'
      }}
    >
      <Themed.h2>{config.title}</Themed.h2>
    </Box>
  )
}
