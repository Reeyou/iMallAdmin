
import React, { Component } from 'react'
import Loadable from 'react-loadable' // 动态导入加载组件
import PageLoading from '../components/PageLoading'
import { Switch, Route, Redirect, HashRouter, HashHistory } from 'react-router-dom'
import MainView from './main'
import MainRouters from './Routers'

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

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HashRouter history={HashHistory}>
        <Switch>
          <Route path='/' component={MainView} exact />
          <Route path='/productManage' component={MainView} exact />
          <Route path='/categoryManage' component={MainView} exact />
          {
            MainRouters.map(route => {
              <Route 
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            })
          }
        </Switch>
      </HashRouter>
    )
  }
} 