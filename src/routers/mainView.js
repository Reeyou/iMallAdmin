import React, { Component } from 'react'
import { Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import Routers from './index'

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
  render() {
    console.log(Routers)
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <MenuApp />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              // background: '#fff',
              minHeight: 280,
            }}
          >
            {/* <Switch>
              {
                Routers.map(item => {

                })
              }
            </Switch> */}
          </Content>
        </Layout>
      </Layout>
    )
  }
}