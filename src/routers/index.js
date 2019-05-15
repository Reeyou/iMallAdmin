
import React, { Component } from 'react'
import Loadable from 'react-loadable' // 动态导入加载组件
import PageLoading from '../components/PageLoading'
import { Switch, Route, Redirect, HashRouter, HashHistory } from 'react-router-dom'

const Index = Loadable({loader: () => import('../container/Index'), loading: PageLoading, delay: 400})
const Home = Loadable({loader: () => import('../container/Home'), loading: PageLoading, delay: 400})

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HashRouter history={HashHistory}>
        <Switch>
          <Route path='/' component={Index} exact />
          <Route path='/home' component={Home} exact />
        </Switch>
      </HashRouter>
    )
  }
} 