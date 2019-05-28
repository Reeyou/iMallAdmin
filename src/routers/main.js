import React, { Component } from 'react'
import Routers from './Routers'
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import MenuApp from '../components/Menu' 
import HeaderApp from '../components/Index/header' 

const { Header, Sider, Content } = Layout;

export default class mainView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  //
  renderContent = () => {
    let resultRouters = []

    routers.map((router, index) => {
      if(router != null) {
        resultRouters.push({
          path: router.path,
          name: router.name,
          component: router.component,
          exact: router.exact
        })
      }
    })
  }
  render() {
    console.log(111)
    console.log(Routers)
    const logoStyle = {
      height: "60px",
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
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
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
              margin: '24px 16px',
              padding: 24,
              // background: '#fff',
              minHeight: 280,
            }}
          >
            <Switch>
              {
                Routers.map(route => {
                  <Route
                    key={route.key}
                    exact={route.exact ? true : false}
                    path={route.path}
                    component={route.component}
                  />
                })
              }
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}