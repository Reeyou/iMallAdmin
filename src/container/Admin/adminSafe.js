/**
  @Author: Reeyou  
  @Params: 管理员中心 
**/

import React, { Component } from 'react'
import { Button, Modal, Form, Input, message } from 'antd';
import  { getUserInfo, resetPwd } from '@/services/userApi'
import {withRouter} from "react-router-dom";
import './index.less'

const confirm = Modal.confirm
const statusList = ["上架中", "已下架"]
@withRouter
class adminSafe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false
    }
  }
  componentWillMount() {
    // this.updatePassword()
  }
  //修改密码
  updatePassword = () => {
    
    this.props.form.validateFields((err, values) => {
      if(err) {

      } else {
        const params = {
          password: values.prePassword,
          newPassword: values.newPassword
        }
        resetPwd(params).then(res => {
          if(res.status == 0) {
            message.success(res.msg)
            this.props.history.push('/')
          } else if (res.status == 1) {
            message.error(res.msg)
          }
        })
      }
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
          <Form.Item>
            {
              getFieldDecorator('prePassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入原密码'
                  }
                ]
              })(
                <Input type='password' placeholder='请输入原密码' />
              )
            }
          </Form.Item>
          </div>
          <div className='account_right_subtitle'>新密码</div>
          <div className='input_wrap'>
          <Form.Item>
            {
              getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码'
                  }
                ]
              })(
                <Input type='password' placeholder='请输入新密码' />
              )
            }
          </Form.Item>
          </div>
          <div className='account_right_subtitle'>确认密码</div>
          <div className='input_wrap'>
          <Form.Item>
            {
              getFieldDecorator('newPasswordConfirm', {
                rules: [
                  {
                    required: true,
                    message: '请确认密码'
                  }
                ],
                onChange: (e) => {
                  if (e.target.value !== this.props.form.getFieldValue('newPassword')) {
                    message.error('密码输入不一致!')
                  }
                }
              })(
                <Input type='password' placeholder='请确认密码' />
              )
            }
          </Form.Item>
          </div>
          <Button loading={this.state.loading} onClick={() => this.updatePassword()} type='primary'>修改密码</Button>
        </div>
      </div>
    )
  }
}
const adminSafeForm = Form.create()(adminSafe)
export default adminSafeForm;