import React, { Component } from 'react'
import { Route } from 'react-router-dom'


class RouterMap extends Component {

  constructor(props) {
    super(props)
  }
  render() {
    const route = this.props
    return (
      <Route
        {...route}
        exact={route.exact ? true : false}
        path={route.path}
        render={props => {
          return (
            <route.component title={route.title} {...route} />
          )
        }}
      />
    )
  }
}

export default RouterMap
