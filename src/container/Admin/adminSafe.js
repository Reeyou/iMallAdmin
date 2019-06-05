/**
  @Author: Reeyou  
  @Params: 管理员中心 
**/

import React, { Component } from 'react'
import { Button, Modal, Form, Input } from 'antd';
import  { getUserInfo } from '@/services/userApi'
import './index.less'

const confirm = Modal.confirm
const statusList = ["上架中", "已下架"]
class adminSafe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false
    }
  }
  componentWillMount() {
    this.updatePassword()
  }
  //修改密码
  updatePassword = () => {
    getUserInfo().then(res => {
      console.log(111)
    })
  }




  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='account_right'>
        <div className='account_right_body'>
          <div className='account_right_title'>
            <span>修改密码</span>
          </div>
          <div className='account_right_subtitle'>原登录密码</div>
          <div className='input_wrap'>
            <Input readOnly />
          </div>
          <div className='account_right_subtitle'>新密码</div>
          <div className='input_wrap'>
            <Input readOnly  />
          </div>
          <div className='account_right_subtitle'>确认密码</div>
          <div className='input_wrap'>
            <Input readOnly  />
          </div>
          <Button loading={this.state.loading} onClick={() => this.updatePassword()} type='primary'>修改密码</Button>
        </div>
      </div>
    )
  }
}
const adminSafeForm = Form.create()(adminSafe)
export default adminSafeForm;