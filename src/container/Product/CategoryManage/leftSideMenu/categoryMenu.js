/**
  @Author: Reeyou  
  @Params: 总品类子节点列表 
**/
import React, { Component } from 'react'
import { Form, Select, Input, Button, Switch  } from 'antd';


class categoryMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: true,
      switchLoading: false
    }
  }

  render() {
    const { currentIndex } = this.props
    const { Option } = Select;
    const { switchLoading } = this.state
    const { getFieldDecorator } = this.props.form; 
    const formItemLayout  = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
    }
    return (
      <div className="category_right">
        {
          !currentIndex ? 
            <Form {...formItemLayout}>
              <Form.Item label="分类名称">
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="启用状态">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Please select your gender!' }],
                })(
                  <Switch loading={switchLoading} defaultChecked />
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" style={{"marginRight": "20px"}}>添加商品</Button>
                <Button type="primary" style={{"marginRight": "20px"}}>修改商品</Button>
                <Button type="danger">删除商品</Button>
              </Form.Item>
            </Form>
            :
            <Form {...formItemLayout}>
              <Form.Item label="分类名称">
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="父节点">
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="选择父节点">
                {getFieldDecorator('note', {
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="启用状态">
                {getFieldDecorator('gender', {
                  rules: [{ required: true, message: 'Please select your gender!' }],
                })(
                  <Switch loading={switchLoading} defaultChecked/>
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" style={{"marginRight": "20px"}}>添加商品</Button>
                <Button type="primary" style={{"marginRight": "20px"}}>修改商品</Button>
                <Button type="danger">删除商品</Button>
              </Form.Item>
            </Form>
          }
      </div>
    )
  }
}
const categoryMenuForm = Form.create()(categoryMenu)
export default categoryMenuForm;