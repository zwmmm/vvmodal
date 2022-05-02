import React, { useMemo, useState } from 'react'
import Preview from './Preview'
import { Box, Flex, Grid, useColorMode } from 'theme-ui'
import clsx from 'clsx'
import Code from './Code'

const FileTabs = (props: {
  files: string[]
  activeIndex: number
  setIndex: (index: number) => void
}) => {
  const { activeIndex, files, setIndex } = props
  return (
    <Flex
      p={2}
      sx={{
        backgroundColor: 'background',
        borderBottom: '2px solid',
        borderBottomColor: 'muted'
      }}
    >
      {files.map((item, index) => {
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
            {item}
          </Box>
        )
      })}
    </Flex>
  )
}

const Playground: React.FC<{
  files: string[]
  children: React.ReactNode
  layout?: 'horizontal' | 'vertical'
}> = function (props) {
  const layout = props.layout || 'horizontal'
  const [mode] = useColorMode()
  const cardStyle = useMemo(() => {
    if (mode === 'light') {
      return {
        borderRadius: 4,
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)'
      }
    }
    return {
      border: '1px solid',
      borderColor: 'muted'
    }
  }, [mode])
  const [activeIndex, setIndex] = useState<number>(0)
  const activeUrl = props.files[activeIndex]
  const [showCode, setShowCode] = useState(false)
  if (layout === 'horizontal') {
    return (
      <Box sx={cardStyle}>
        <FileTabs
          files={props.files}
          activeIndex={activeIndex}
          setIndex={setIndex}
        />
        <Grid gap={0} columns="50% 50%" sx={{ height: 500 }}>
          <Code url={activeUrl} />
          <Preview>{props.children}</Preview>
        </Grid>
      </Box>
    )
  }
  return (
    <Box sx={cardStyle} className="ukyou-playground">
      <Box>
        <Preview sx={{ background: 'background' }}>{props.children}</Preview>
        <Flex
          sx={{
            height: '60px',
            borderTop: (t) => `1px solid ${t.colors?.muted}`,
            borderBottom: (t) => `1px solid ${t.colors?.muted}`,
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setShowCode((val) => !val)}
        >
          {showCode ? '收起代码' : '查看代码'}
        </Flex>
      </Box>
      {showCode && (
        <>
          <FileTabs
            files={props.files}
            activeIndex={activeIndex}
            setIndex={setIndex}
          />
          <Box sx={{ height: 500, overflow: 'auto' }}>
            <Code url={activeUrl} />
          </Box>
        </>
      )}
    </Box>
  )
}

export default Playground
