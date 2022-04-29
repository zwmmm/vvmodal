import Code from './Code'
import React, { useState } from 'react'
import { FileType } from '../../type'
import Playground from './Playground'
import { Box, Card, Flex, Grid } from 'theme-ui'
import clsx from 'clsx'

const Preview: React.FC<{
  files: FileType[]
  code: React.ReactNode
}> = function (props) {
  const [activeIndex, setIndex] = useState<number>(0)
  return (
    <Card>
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
        <Code code={props.files[activeIndex]?.code} />
        <Playground>{props.code}</Playground>
      </Grid>
    </Card>
  )
}

export default Preview
