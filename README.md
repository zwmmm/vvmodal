# vvmodal

> 灵感来自于[nice-modal-react](https://github.com/ebay/nice-modal-react) 用来管理各种弹窗，简化弹窗的操作

## 特点

- 仅支持React
- 命令式风格
- 0依赖且体积小
- 未展示弹窗之前不会渲染
- 全局弹窗和局部弹窗两种模式

## vvmodal 解决了什么问题 ?

- modal 状态混乱且复杂
- 当你不知道要将逻辑写modal内部还是父组件中，使用vvmodal可以轻松解决
- 虽然 react 提倡状态提升，但是当一个页面下modal越来越多，把所有的状态都提升到父组件，父组件将会变得异常复杂
- 多级弹窗状态管理

## 下载使用

```bash
npm i vvmodal
```

## 最简单的使用方法

```tsx
import { antdModal, createGlobalModal, useModal, UkyouProvider } from "vvmodal";
import { Button, Modal } from "antd";

const Modal = createGlobalModal(() => {
  const modal = useModal();
  return (
    <Modal {...antdModal(modal)}>
      使用vvmodal管理modal状态
    </Modal>
  )
})

function App() {
  return (
    <UkyouProvider>
      <Button onClick={() => Modal.show()}>点击展示</Button>
    </UkyouProvider>
  )
}
```
