import React, {Component} from 'react'
import { Menu, Dropdown, Icon } from 'antd';
import './index.less'

export default class HeaderApp extends Component {
  constructor(props) {
    super(props)
  }
  loginOut = () => {
    window.location.href = '/'
  }
  handleUser = () => {
    // this.props.history.push('/userInfo')
    window.location.href = '/#/userInfo'
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={this.handleUser}>
            个人信息
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.loginOut}>
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
        <div className='header'>
          <div className="container clearFix">
            <div className="user">
              <img src="" alt=""/>
              <div className='info'>
                <Dropdown overlay={menu}>
                  <i className="ant-dropdown-link">
                    Reeyou <Icon type="down" />
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