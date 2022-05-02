import { ConfigType } from './type'

const config: ConfigType = {
  title: 'vvModal',
  logo: '',
  repository: 'zwmmm/ukyou',
  chapters: {
    apis: [
      {
        name: 'Apis',
        children: [
          {
            name: 'create',
            path: '/apis'
          },
          {
            name: 'show',
            path: '/apis/show'
          }
        ]
      }
    ]
  },
  menus: {
    '/': '首页',
    '/apis': 'API'
  }
}

export default config
