import React, {Component} from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import { withRouter } from 'react-router-dom'
import avatar from './Avatar.png'
import './index.less'

@withRouter
export default class HeaderApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'Admin'
    }
  }
  loginOut = () => {
    this.props.history.push('/')
  }
  handleUser = () => {
    this.props.history.push('/userInfo')
  }
  handleImg = () => {
    console.log(111)
    this.props.history.push('/userInfo')
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={this.handleUser}>
          <Icon type="user" />
          个人信息
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.loginOut}>
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
        <div className='header'>
          <div className="container clearFix">
            <div className="user">
              <div className='img' onClick={this.handleImg}>
                <img src={avatar} alt=""/>
              </div>
              <div className='info'>
                <Dropdown overlay={menu} placement="bottomCenter">
                  <i className="ant-dropdown-link">
                    <span style={{color: 'rgba(0,0,0,.65)'}}>{this.state.userName}</span> <Icon type="down" />
                  </i>
                </Dropdown>
              </div>
              <div className="message">
                <i className='iconfont icon-duanxin'></i>
              </div>
              <div className="skin">
                <i className='iconfont icon-icon_skin'></i>
              </div>
            </div>
          </div>
        </div>
    )
  }
}