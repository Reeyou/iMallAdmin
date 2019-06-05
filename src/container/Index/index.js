/**
  @Author: Reeyou   
  @Params: 登陆页面 
**/
import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import BgCanvas from './bgCanvas'
import Footer from '@/components/Index/footer'
import { Form } from 'antd'
import './index.less'
import  { getUserLogin } from '@/services/userApi'

@inject('Global')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  //
  componentWillMount() {

  }
  handleLogin() {
    this.props.form.validateFields((err, value) => {
      if(err) {

      } else {
        const params = {
          username: value.username,
          password: value.password
        }
        getUserLogin(params).then(res => {
          if(res.status == 0) {
            this.props.history.push('/home')
            this.setState({
              data: res.data
            })
          }
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form

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
            {
              getFieldDecorator("username", {
                rules: [{required: true, message: "请输入用户名"}],
                initialValue: "",
              })(
                <input type="text" placeholder="用户名"/>
              )
            }
          </div>
          <p className='error_msg'></p>
          <div className='input'>
            <i className='iconfont icon-password'></i>
            {
              getFieldDecorator("password", {
                rules: [{required: true, message: "请输入用户名"}],
                initialValue: "",
              })(
                <input type="password" placeholder="登录密码" />
              )
            }
          </div>
          <p className='error_msg'></p>
          <button type='button' onClick={() => this.handleLogin()}>登录</button>
        </div>
        <Footer />
      </div>
    )
  }
}
const IndexForm = Form.create()(Index)
export default IndexForm;