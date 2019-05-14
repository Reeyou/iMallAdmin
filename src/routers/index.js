
import React, { Component } from 'react'
import Loadable from 'react-loadable'
// import PageLoading from '../components/PageLoading'
import { Switch, Route, Redirect, Router } from 'react-router-dom'

const Index = Loadable({loader: () => import('../container/Index'), loading: '1', delay: 400})

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Route path='/' component={Index} exact />
      </Router>
    )
  }
} 