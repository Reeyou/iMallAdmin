
import React, { Component } from 'react'
import Loadable from 'react-loadable' // 动态导入加载组件
import PageLoading from '../components/PageLoading'
import { Switch, Route, Redirect, HashRouter, HashHistory } from 'react-router-dom'
import MainView from './main'
import MainRouters from './Routers'

const Index = Loadable({loader: () => import('../container/Index'), loading: PageLoading, delay: 400})

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HashRouter history={HashHistory}>
        <Switch>
          <Route path='/' component={Index} exact />
          {
            MainRouters.map(route => {
              if(route.routers) {
                return route.routers.map(routeItem => {
                          return(
                            <Route
                              key={routeItem.key}
                              exact={routeItem.exact ? true : false}
                              path={routeItem.path}
                              component={routeItem.component}
                            />
                          )
                        })
              } else {
                return (
                  <Route
                    key={route.key}
                    exact={route.exact ? true : false}
                    path={route.path}
                    component={route.component}
                  />
                )
              }
            })
          }
        </Switch>
      </HashRouter>
    )
  }
} 