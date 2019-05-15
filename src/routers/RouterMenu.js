let menulist = [
  {
    path: '/home',
    name: '首页',
    key: '01',
    icon: 'iconfont icon-shouye'
  },
  {
    path: '/productManage',
    name: '商品管理',
    key: '02',
    icon: 'iconfont icon-iconsp1'
  },
  {
    path: '/orderManage',
    name: '订单管理',
    key: '03',
    icon: 'iconfont icon-dingdan'
  },
  {
    path: '/accountManage',
    name: '用户管理',
    key: '04',
    icon: 'iconfont icon-user'
  },
  {
    path: '/systemManage',
    name: '系统管理',
    key: '05',
    icon: 'iconfont icon-setting',
    children: [
      {
        path: '/accountManage',
        name: '权限管理',
        key: '0501'
      },
      {
        path: '/accountManage',
        name: '信息管理',
        key: '0502'
      },
      {
        path: '/accountManage',
        name: '日志管理',
        key: '0503'
      }
    ]
  }
]

export default menulist;