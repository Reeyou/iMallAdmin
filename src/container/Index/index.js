/**
  @Author: Reeyou   
  @Params: 登陆页面 
**/
import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import BgCanvas from './bgCanvas'
import Footer from '@/components/Index/footer'
import './index.less'

@inject('Global')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='wrapper'>
        <BgCanvas />
        <div className="container">
          <div className="title">
            <h1>iMall后台管理系统</h1>
            <h3>欢迎登录</h3>
          </div>
          <div className='input'>
            <i className='iconfont icon-user' />
            <input type="text" placeholder="用户名" />
          </div>
          <p className='error_msg'></p>
          <div className='input'>
            <i className='iconfont icon-password'></i>
            <input type="password" placeholder="登录密码" />
          </div>
          <p className='error_msg'></p>
          <button type='button'>登录</button>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Index;