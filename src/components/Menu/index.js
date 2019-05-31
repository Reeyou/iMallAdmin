import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Menu, Button , Icon } from 'antd';
import './index.less'
import { observer, inject } from 'mobx-react'
import logo from '@/assets/img/logo.png'
import menulist from '@/routers/RouterMenu'

const SubMenu = Menu.SubMenu;

@inject('Global')
@observer
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

  // 阻止事件冒泡
	stopPropagation(e) {
		// 取消默认的浏览器自带右键
		e.preventDefault();
		// 阻止事件冒泡
		e.stopPropagation();
		// 阻止React本地事件冒泡
		// e.nativeEvent.stopImmediatePropagation()
  }
  // linkTo = (e) => {
  //   console.log(e)
  //   e.preventDefault()
  //   // e.stopPropagation();
  //   // e.nativeEvent.stopImmediatePropagation()
  // }
  handleMenu() {
    return(   
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
                    return  <Menu.Item
                              key={childItem.key}
                            >
                              <Link to={childItem.path} onClick={this.linkTo}>
                                <span>{childItem.name}</span>
                              </Link>
                            </Menu.Item>
                  })
                }
              </SubMenu>
              :
              <Menu.Item
                key={item.key}
              >
                <Link to={item.path} onClick={this.linkTo}>
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </Link>
              </Menu.Item> 
        })
    )
  }

  render() {
    return (
      <div className='menu'>
        <Menu
          mode="inline"
          inlineCollapsed={this.state.collapsed}
          
        >
          {
            this.handleMenu()
          }
        </Menu>
      </div>
    )
  }
}