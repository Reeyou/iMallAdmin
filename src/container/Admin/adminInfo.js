/**
  @Author: Reeyou  
  @Params: 管理员中心 
**/

import React, { Component } from 'react'
import { Select, InputNumber, Button, Modal, Form, Input, Upload, Icon, message } from 'antd';
import  { getUserInfo } from '@/services/userApi'
import avatar from '@/assets/img/defaultAvatar.png'
import styles from './index.less'

const confirm = Modal.confirm
const statusList = ["上架中", "已下架"]
class AdminInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }
  componentWillMount() {
    this.getUserInfo()
  }
  //获取个人信息
  getUserInfo = () => {
    getUserInfo().then(res => {
      if(res.code == 200) {
        this.setState({
          data: res.data
        })
      } else {
        console.log('请求错误')
      }
    })
  }




  render() {
    const { data } = this.state
    return (
      <div className='account_right'>
        <div className='account_right_body'>
          <div className='account_right_title'>
            <span>基本设置</span>
          </div>
          <div className='account_right_subtitle'>头像</div>
          <div className='avatar'>
             <img src={avatar} /> 
          </div>
          <div className='account_right_subtitle'>角色</div>
          <div className='input_wrap'>
            <Input readOnly value={data.role === 1 ? '管理员' : '普通用户'} />
          </div>
          <div className='account_right_subtitle'>用户名</div>
          <div className='input_wrap'>
            <Input readOnly value={data.username}/>
          </div>
          <div className='account_right_subtitle'>手机号码</div>
          <div className='input_wrap'>
            <Input readOnly value={data.phone} />
          </div>
          <div className='account_right_subtitle'>邮箱</div>
          <div className='input_wrap'>
            <Input readOnly value={data.email} />
          </div>
          {/* <Button loading={this.state.loading} onClick={() => this.handleUpdateUserInfo()} type='primary'>更新基本信息</Button> */}
        </div>
      </div>
    )
  }
}
const AdminInfoForm = Form.create()(AdminInfo)
export default AdminInfoForm;