import { Config } from 'vvdoc'

export const config: Config = {
  title: 'vvModal',
  logo: '/vvmodal.png',
  repository: 'https://github.com/zwmmm/vvModal',
  docsearch: {
    appId: '',
    indexName: '',
    apiKey: ''
  },
  menus: [
    {
      text: '首页',
      active: '^/',
      path: '/'
    },
    {
      text: 'API',
      active: '^/apis',
      path: '/apis/'
    }
  ],
  chapters: {
    '/apis/': [
      {
        name: 'Apis',
        children: [
          {
            name: 'createGlobalModal',
            path: '/apis/'
          },
          {
            name: 'createModal',
            path: '/apis/createModal'
          },
          {
            name: 'show',
            path: '/apis/show'
          },
          {
            name: 'hide',
            path: '/apis/hide'
          },
          {
            name: 'antdModal',
            path: '/apis/antdModal'
          },
          {
            name: 'antdDrawer',
            path: '/apis/antdDrawer'
          }
        ]
      },
      {
        name: 'Hooks',
        children: [
          {
            name: 'useModal',
            path: '/apis/useModal'
          },
          {
            name: 'useShow',
            path: '/apis/useShow'
          },
          {
            name: 'useHide',
            path: '/apis/useHide'
          }
        ]
      }
    ]
  },
  theme: {
    styles: {
      colors: {}
    }
  }
}