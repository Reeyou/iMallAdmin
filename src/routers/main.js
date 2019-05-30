import React, { Component } from 'react'
import MainRouters from './Routers'
import { Switch, Redirect, withRouter, Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';

import MenuApp from '../components/Menu' 
import HeaderApp from '../components/Index/header' 

import Loadable from 'react-loadable' // 动态导入加载组件
import PageLoading from '../components/PageLoading'
const { Header, Sider, Content } = Layout;
const CategoryManage = Loadable({loader: () => import('../container/Product/CategoryManage'), loading: PageLoading, delay: 400})
const ProductManage = Loadable({loader: () => import('../container/Product/ProductManage'), loading: PageLoading, delay: 400})

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
  render() {
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
              margin: '1px 0 0 0',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path='/' component={ProductManage} exact />
              {
                MainRouters.map(route => {
                  // return (
                  //   <Route
                  //     key={route.key}
                  //     exact={route.exact ? true : false}
                  //     path={route.path}
                  //     component={route.component}
                  //   />
                  // )
                  route.routers ? route.routers.map(routeItem => {
                    return (
                      <Route
                        key={routeItem.key}
                        exact={routeItem.exact ? true : false}
                        path={routeItem.path}
                        component={routeItem.component}
                      />
                    )
                  }) : ''
                })
              }
            </Switch>
          </Content>
        </Layout>
      </Layout>
    )
  }
}