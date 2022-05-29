<h1 align='center'>
  <samp>vvmodal</samp>
  <a href='https://vvmodal.vercel.app/'>
    <img src='https://img.shields.io/npm/v/vvmodal?color=333&labelColor=555&style=flat-square' alt='version'/>
  </a>
</h1>

<p align='center'>
  <samp>使用 Context 来管理 Modal</samp>
<br>


## 下载使用

[文档地址](https://vvmodal.vercel.app/)

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

> 灵感来自于[nice-modal-react](https://github.com/ebay/nice-modal-react)