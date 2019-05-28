import React, {Component} from 'react'
import { Menu, Dropdown, Icon, Layout } from 'antd';
import './index.less'

const { Header, Sider, Content } = Layout;
export default class HeaderApp extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            个人信息
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
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
                  <a className="ant-dropdown-link" href="#">
                    Reeyou <Icon type="down" />
                  </a>
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