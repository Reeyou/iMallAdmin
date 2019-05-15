import React, {Component} from 'react'
import { Menu, Button , Icon } from 'antd';
import './index.less'
import logo from '@/assets/img/logo.png'
import menulist from '@/routers/RouterMenu'

const SubMenu = Menu.SubMenu;

export default class MallMenu extends Component {
  constructor(props) {
    super(props),
    this.state = {
      collapsed: false,
    };
  }
  
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    console.log(Boolean(menulist[3].children))
    return (
      <div className='menu'>
        <div className='menu_header'>
          <div className='container'>
            <img src={logo} alt="" />
          </div>
        </div>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {
            menulist.map((item, index) => {
             return item.children ?  
                    <SubMenu
                      key={item.key}
                      title={
                        <span>
                          <i className={item.icon}></i>
                          <span>{item.name}</span>
                        </span>
                      }
                    >
                      {
                        item.children.map(childItem => {
                          console.log(childItem.key)
                          return <Menu.Item key={childItem.key}>{childItem.name}</Menu.Item>
                        })
                      }
                    </SubMenu>
                    :
                    <Menu.Item key={item.key}>
                      <i className={item.icon}></i>
                      <span>{item.name}</span>
                    </Menu.Item> 
            })
          }
        </Menu>
      </div>
    )
  }
}