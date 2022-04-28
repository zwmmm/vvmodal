import Highlight, { defaultProps } from 'prism-react-renderer'
import githubTheme from 'prism-react-renderer/themes/vsDark'
import { styled } from '@mui/styles'
import React from 'react'
import {CodeType} from "../type";

const Pre = styled('pre')({
  textAlign: 'left',
  margin: '1em 0',
  padding: '0.5em',
  overflow: 'scroll'
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

const Code: React.FC<{ code: CodeType["code"] }> = (props) => {
  return (
    <Highlight
      {...defaultProps}
      code={props.code}
      language="tsx"
      theme={githubTheme}
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
