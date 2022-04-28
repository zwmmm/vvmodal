import { Tabs } from 'antd'
import Code from './Code'
import React from 'react'
import { CodeType } from '../type'

const Preview: React.FC<{
  codes: CodeType[]
}> = function (props) {
  return (
    <Tabs type="card">
      {props.codes.map((item) => {
        return (
          <Tabs.TabPane key={item.title} tab={item.title}>
            <Code code={item.code} />
          </Tabs.TabPane>
        )
      })}
    </Tabs>
  )
}

export default Preview
