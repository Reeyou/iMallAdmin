import PageLoading from '../components/PageLoading'
import Loadable from 'react-loadable'

const Index = Loadable({loader: () => import('../container/Index'), loading: PageLoading, delay: 400})
const Home = Loadable({loader: () => import('../container/Home'), loading: PageLoading, delay: 400})

//商品信息
const ProductManage = Loadable({loader: () => import('../container/Product/ProductManage'), loading: PageLoading, delay: 400})
const AddProduct = Loadable({loader: () => import('../container/Product/ProductManage/addProduct'), loading: PageLoading, delay: 400})
const EditProduct = Loadable({loader: () => import('../container/Product/ProductManage/editProduct'), loading: PageLoading, delay: 400})
const LookProduct = Loadable({loader: () => import('../container/Product/ProductManage/lookProduct'), loading: PageLoading, delay: 400})

//分类信息
const CategoryManage = Loadable({loader: () => import('../container/Product/CategoryManage'), loading: PageLoading, delay: 400})
const categoryChildList = Loadable({loader: () => import('../container/Product/CategoryManage/categoryChild'), loading: PageLoading, delay: 400})

const OrderManage = Loadable({loader: () => import('../container/Order'), loading: PageLoading, delay: 400})
const AccountManage = Loadable({loader: () => import('../container/AccountManage'), loading: PageLoading, delay: 400})


const AuthManage = Loadable({loader: () => import('../container/SystemManage/AuthManage'), loading: PageLoading, delay: 400})
const MessageManage = Loadable({loader: () => import('../container/SystemManage/MessageManage'), loading: PageLoading, delay: 400})
const LogManage = Loadable({loader: () => import('../container/SystemManage/LogManage'), loading: PageLoading, delay: 400})

//
const Admin = Loadable({loader: () => import('../container/Admin'), loading: PageLoading, delay: 400})

const routers = [
  {
    path: '/Home',
    name: '首页',
    key: '',
    component: Home,
    exact: true
  },
  {
    path: '/userInfo',
    name: '管理员中心',
    key: 'Admin',
    component: Admin,
    exact: true
  },
  {
    path: '/productManage',
    name: '商品列表',
    key: 'ProductManage',
    component: ProductManage,
    exact: true,
    routers: [
      {
        path: '/productManage/addProduct',
        upperPath: '/productManage',
        upperName: '商品列表',
        name: '添加商品',
        key: 'AddProduct',
        component: AddProduct,
        exact: true,
      },
      {
        path: '/productManage/editProduct',
        upperPath: '/productManage',
        upperName: '商品列表',
        name: '编辑商品',
        key: 'EditProduct',
        component: EditProduct,
        exact: true,
      },
      {
        path: '/productManage/lookProduct',
        upperPath: '/productManage',
        upperName: '商品列表',
        name: '查看商品',
        key: 'LookProduct',
        component: LookProduct,
        exact: true,
      }
    ]
  },
  {
    path: '/categoryManage',
    name: '分类列表',
    key: 'CategoryManage',
    component: CategoryManage,
    exact: true,
    routers: [
      {
        path: '/categoryManage/categoryChildList',
        upperPath: '/categoryManage',
        upperName: '分类列表',
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