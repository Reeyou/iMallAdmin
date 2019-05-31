import PageLoading from '../components/PageLoading'
import Loadable from 'react-loadable'

const Index = Loadable({loader: () => import('../container/Index'), loading: PageLoading, delay: 400})
const Home = Loadable({loader: () => import('../container/Home'), loading: PageLoading, delay: 400})
const ProductManage = Loadable({loader: () => import('../container/Product/ProductManage'), loading: PageLoading, delay: 400})
const CategoryManage = Loadable({loader: () => import('../container/Product/CategoryManage'), loading: PageLoading, delay: 400})
const categoryChildList = Loadable({loader: () => import('../container/Product/CategoryManage/categoryChild'), loading: PageLoading, delay: 400})

const OrderManage = Loadable({loader: () => import('../container/Order'), loading: PageLoading, delay: 400})
const AccountManage = Loadable({loader: () => import('../container/AccountManage'), loading: PageLoading, delay: 400})


const AuthManage = Loadable({loader: () => import('../container/SystemManage/AuthManage'), loading: PageLoading, delay: 400})
const MessageManage = Loadable({loader: () => import('../container/SystemManage/MessageManage'), loading: PageLoading, delay: 400})
const LogManage = Loadable({loader: () => import('../container/SystemManage/LogManage'), loading: PageLoading, delay: 400})

const routers = [
  {
    path: '/Home',
    name: '首页',
    key: '',
    component: Home,
    exact: true
  },
  {
    path: '/productManage',
    name: '商品列表',
    upperName: '商品管理',
    key: 'ProductManage',
    component: ProductManage,
    exact: true,
    // routers: [
    //   {
        // path: '/ProductManage',
        // name: '商品列表',
        // key: 'ProductManage',
        // component: ProductManage,
        // exact: true,
      // }
    // ]
  },
  {
    path: '/categoryManage',
    name: '分类列表',
    upperName: '分类管理',
    key: 'CategoryManage',
    component: CategoryManage,
    exact: true,
    routers: [
      {
        path: '/categoryManage/categoryChildList',
        name: '分类子列表',
        key: 'categoryChildList',
        component: categoryChildList,
        exact: true,
      }
    ]
  },
  {
    path: '/orderManage',
    name: '订单列表',
    upperName: '订单管理',
    key: 'OrderManage',
    component: OrderManage,
    exact: true,
  },
  {
    path: '/accountManage',
    name: '账户列表',
    upperName: '账户管理',
    key: 'AccountManage',
    component: AccountManage,
    exact: true,
  },
  {
    path: '/logManage',
    name: '日志列表',
    upperName: '日志管理',
    key: 'LogManage',
    component: LogManage,
    exact: true,
  },
]

export default routers