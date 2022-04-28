import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'
import { styled } from '@mui/styles'
import { FileType } from '../type'

const Pre = styled('pre')({
  textAlign: 'left',
  padding: '0.5em',
  height: '100%',
  boxSizing: 'border-box',
  flex: 1
})

const Line = styled('span')({
  display: 'table-row'
})

const LineNo = styled('span')({
  display: 'table-cell',
  textAlign: 'right',
  paddingRight: '1em',
  userSelect: 'none',
  opacity: '0.5'
})

const LineContent = styled('span')({
  display: 'table-cell'
})

const Code: React.FC<{ code: FileType['code'] }> = (props) => {
  return (
    <Highlight
      {...defaultProps}
      code={props.code.trim()}
      language="tsx"
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  )
}

export default Code
