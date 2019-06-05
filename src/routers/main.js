import React, { Component } from 'react'
import MainRouters from './Routers'
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import getRouters from '../utils/getRouters'
import PageBread from '../components/PageBread'

import MenuApp from '../components/Menu' 
import HeaderApp from '../components/Index/header' 

const { Header, Sider, Content } = Layout;

export default class mainView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      routers : []
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  componentWillMount() {
    this.getResultRouter()
  }
  getResultRouter() {
    let resultRouters = getRouters(MainRouters)
    this.setState({
      routers: resultRouters
    })
  }
  

  render() {
    const { routers } = this.state
    const logoStyle = {
      height: "64px",
      background: "rgb(0,0,0)",
    }
    const iconStyle = {
      fontSize: '18px',
      lineHeight: '64px',
      padding: '0 24px',
      cursor: 'pointer',
      transition: 'color 0.3s',
      display: 'inline-block'
    }
    return (
      <Layout>
        <Sider width='220' trigger={null} collapsible collapsed={this.state.collapsed}>
          <div style={logoStyle} >111</div>
          <MenuApp />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              style={iconStyle}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <HeaderApp />
          </Header>
          <Content
            style={{
              margin: '1px 0 0 0',
              padding: '10px 24px',
              background: '#fff',
              minHeight: 280,
            }}
          >
          <PageBread />
            <Switch>
              {
                routers.map(route => {
                  return (
                    <Route
                      key={route.key}
                      exact={route.exact ? true : false}
                      path={route.path}
                      component={route.component}
                    />
                  )
                })
              }
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}