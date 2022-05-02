import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { Themed, useColorMode } from 'theme-ui'
import React from 'react'
import styled from '../../theme/styled'
import darkTheme from 'prism-react-renderer/themes/dracula'
import lightTheme from 'prism-react-renderer/themes/github'

const Line = styled('span', {
  display: 'table-row',
  width: '100%'
})

const LineNo = styled('span', {
  display: 'table-cell',
  textAlign: 'right',
  paddingRight: '1em',
  userSelect: 'none',
  opacity: '0.5'
})

const LineContent = styled('span', {
  display: 'table-cell'
})

const aliases: Record<string, Language | undefined> = {
  js: 'javascript',
  sh: 'bash'
}

const isInRange = (start: number, end: number, num: number) => {
  if (num >= start && num <= end) {
    return true
  }
  return false
}

const checkRanges = (range: number[], num: number) => {
  for (let i = 0; i < range.length; i += 2) {
    if (isInRange(range[i], range[i + 1], num)) {
      return true
    }
  }
  return false
}

type HighlightProps = React.ComponentPropsWithoutRef<typeof Highlight>
type Tokens = Parameters<HighlightProps['children']>[0]['tokens']
type Token = Tokens[number][number]

export interface ThemeUIPrismProps
  extends Omit<
    HighlightProps,
    'children' | 'code' | 'language' | 'theme' | 'Prism'
  > {
  className: string
  children: string
  Prism?: HighlightProps['Prism']
}

export default function ThemeUIPrism({
  children,
  className: outerClassName,
  ...props
}: ThemeUIPrismProps) {
  const [mode] = useColorMode()
  const theme = mode === 'dark' ? darkTheme : lightTheme
  const [language] = outerClassName.replace(/language-/, '').split(' ')
  const lang = aliases[language] || language
  let startEndRangesToHighlight: number[] = []
  let countHighlightCommentsRemoved = 0

  const findStartAndEndHighlights = (tokens: Token[][]) => {
    // eslint-disable-next-line array-callback-return
    const tokensWithoutHighlightComments = tokens.filter((item, index) => {
      const removeLine = item
        // eslint-disable-next-line array-callback-return
        .map(({ content }) => {
          if (content.trim() === '// highlight-start') {
            startEndRangesToHighlight.push(
              index - countHighlightCommentsRemoved
            )
            countHighlightCommentsRemoved += 1
            return true
          }
          if (content.trim() === '// highlight-end') {
            startEndRangesToHighlight.push(
              index - (countHighlightCommentsRemoved + 1)
            )
            countHighlightCommentsRemoved += 1
            return true
          }
        })
        .filter(Boolean)[0]
      if (!removeLine) {
        return item
      }
    })
    return tokensWithoutHighlightComments
  }

  const isStartEndHighlighted = (index: number) => {
    return checkRanges(startEndRangesToHighlight, index)
  }

  const isInlineHighlighted = (line: Token[]) => {
    const regex = /\/\/ highlight-line$/
    for (let token of line) {
      if (regex.test(token.content)) {
        token.content = token.content.replace(regex, '') // remove the highlight-line comment now that we've acted on it
        return true
      }
    }
    return false
  }

  const shouldHighlightLine = (line: Token[], index: number) => {
    return isStartEndHighlighted(index) || isInlineHighlighted(line)
  }

  return (
    <Highlight
      {...defaultProps}
      {...props}
      code={children.trim()}
      language={lang as Language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const tokensWithoutHighlightComments = findStartAndEndHighlights(tokens)
        return (
          <Themed.pre
            className={`${outerClassName} ${className}`}
            style={style}
            sx={{ margin: 0 }}
          >
            {tokensWithoutHighlightComments.map((line, i) => {
              const highlightLine = shouldHighlightLine(line, i)
              const lineProps = getLineProps({ line, key: i })
              return (
                <Line
                  {...lineProps}
                  sx={{
                    background: highlightLine ? 'highlight' : ''
                  }}
                >
                  <LineNo>{i + 1}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span
                        {...getTokenProps({ token, key })}
                        sx={{
                          display: token.empty ? 'inline-block' : 'initial'
                        }}
                      />
                    ))}
                  </LineContent>
                </Line>
              )
            })}
          </Themed.pre>
        )
      }}
    </Highlight>
  )
}
