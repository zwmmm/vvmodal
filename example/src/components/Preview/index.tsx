import React, { useMemo, useState } from 'react'
import { FileType } from '../../type'
import Playground from './Playground'
import { Box, Flex, Grid, useColorMode } from 'theme-ui'
import clsx from 'clsx'
import Prism from './Prism'

const Preview: React.FC<{
  files: FileType[]
  code: React.ReactNode
}> = function (props) {
  const [mode] = useColorMode()
  const cardStyle = useMemo(() => {
    if (mode === 'light') {
      return {
        padding: 2,
        borderRadius: 4,
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)'
      }
    }
    return {
      padding: 2,
      borderRadius: 4,
      border: '1px solid',
      borderColor: 'muted'
    }
  }, [mode])
  const [activeIndex, setIndex] = useState<number>(0)
  const dot = useMemo(() => {
    return props.files[activeIndex].title.split('.').pop() || ''
  }, [activeIndex])
  return (
    <Box sx={cardStyle}>
      <Flex
        sx={{
          backgroundColor: 'background',
          borderBottom: '2px solid',
          borderBottomColor: 'muted'
        }}
      >
        {props.files.map((item, index) => {
          return (
            <Box
              p={[2]}
              sx={{
                cursor: 'pointer',
                fontWeight: 'bold',
                borderBottom: '2px solid transparent',
                '&.active': {
                  color: 'primary',
                  borderBottomColor: 'primary'
                }
              }}
              key={index}
              className={clsx({ active: activeIndex === index })}
              onClick={() => setIndex(index)}
            >
              {item.title}
            </Box>
          )
        })}
      </Flex>
      <Grid gap={0} columns="50% 50%" sx={{ height: 500, paddingTop: 2 }}>
        <Prism className={dot}>{props.files[activeIndex]?.code}</Prism>
        <Playground>{props.code}</Playground>
      </Grid>
    </Box>
  )
}

export default Preview
