/**
  @Author: Reeyou  
  @Params: 管理员中心 
**/

import React, { Component } from 'react'
import { Select, InputNumber, Button, Modal, Form, Input, Upload, Icon, message } from 'antd';
import  { getUserInfo } from '@/services/userApi'
import './index.less'

const confirm = Modal.confirm
const statusList = ["上架中", "已下架"]
class adminSafe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    }
  }
  componentWillMount() {
    this.getUserInfo()
  }
  //
  getUserInfo = () => {
    getUserInfo().then(res => {
      console.log(111)
    })
  }




  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    const formSmItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    const { Option } = Select
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className='userInfo'>
        <div className="title">
          <h3>个人信息</h3>
        </div>
        <Form>
          <Form.Item
            label='头像'
            {...formItemLayout}
          >
            {getFieldDecorator('avatar', {
              rules: []
            })(
              <Input style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            label='用户名'
            {...formItemLayout}
          >
            {getFieldDecorator('nickName', {
              rules: []
            })(
              <Input style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            label='手机号码'
            {...formItemLayout}
          >
            {getFieldDecorator('nickMobile', {
              rules: []
            })(
              <Input style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            {...formSmItemLayout}
            label='角色'
          >
            {getFieldDecorator('role', {
              rules: []
            })(
              <InputNumber style={{width: '40%'}} />
            )}
            <span className="ant-form-text">元</span>
          </Form.Item>
        </Form>
        <div className='btn'>
          <Button onClick={this.handleAddOk} type='primary'>添加</Button>
        </div>
      </div>
    )
  }
}
const adminSafeForm = Form.create()(adminSafe)
export default adminSafeForm;