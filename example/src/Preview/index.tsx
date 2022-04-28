import { Tabs } from 'antd'
import Code from './Code'
import React, { useState } from 'react'
import { FileType } from '../type'
import { Flex } from '../Element'
import Playground from './Playground'
import { cssd } from '../styles'

const PreviewContainer = cssd('div')((props) => ({
  borderRadius: '8px',
  backgroundColor: '#fff',
  overflow: 'hidden',
  boxShadow: props.theme.boxShadow
}))

const TabsContainer = cssd('div')({
  paddingLeft: 0
})

const Content = cssd(Flex)({
  height: 500
})

const Preview: React.FC<{
  files: FileType[]
  code: React.ReactNode
}> = function (props) {
  const [index, setIndex] = useState<number>(0)
  const onChange = (key: string) => {
    setIndex(Number(key))
  }
  return (
    <PreviewContainer>
      <TabsContainer>
        <Tabs onChange={onChange}>
          {props.files.map((item, index) => {
            return <Tabs.TabPane key={index} tab={item.title} />
          })}
        </Tabs>
      </TabsContainer>
      <Content>
        <Code code={props.files[index]?.code} />
        <Playground>{props.code}</Playground>
      </Content>
    </PreviewContainer>
  )
}

export default Preview
