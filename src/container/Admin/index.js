/**
  @Author: Reeyou  
  @Params: 管理员中心 
**/

import React, { Component } from 'react'
import AdminInfo from './adminInfo'
import AdminSafe from './adminSafe'
import './index.less'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab: 'info'
    }
  }
  changeSelectTab(tab) {
    this.setState({
      currentTab: tab
    })
  }
  render() {
    const { currentTab } = this.state
    return (
      <div className='account_wrap'>
        <div className='account_left'>
          <div className='account_left_body'>
            <div className={currentTab == 'info' ? 'selectItem active' : 'selectItem'} onClick={() => this.changeSelectTab('info')}>基本设置</div>
            <div className={currentTab == 'safe' ? 'selectItem active' : 'selectItem'} onClick={() => this.changeSelectTab('safe')}>登录密码</div>
          </div>
        </div>
        {
          currentTab == 'info' && <AdminInfo />
        }
        {
          currentTab == 'safe' && <AdminSafe />
        }
      </div>
    )
  }
}
export default Index;