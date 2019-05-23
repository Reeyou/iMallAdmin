/**
  @Author: Reeyou  
  @Params: 总品类子节点列表 
**/
import React, { Component } from 'react'
import { Form, Select, Input, Button, Switch, Modal } from 'antd';
import  { 
  getCategoryList,
  getCategoryChildrenList,
  addCategory,
  updateCategory
 } from '@/services/productApi'

const confirm = Modal.confirm;

class categoryMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      children: true,
      switchLoading: false,
      addVisible: false,
      editVisble: false
    }
  }
  //添加分类信息
  handleAdd = () => {
    console.log(this.state.addVisible)
    this.setState({
      addVisible: true
    })
  }
  handleAddOk = () => {
    addCategory().then(res => {
      if(res.status == 0) {
        this.setState({
          addVisible: false
        })
      }
    })
  }
  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
  }
  //修改分类信息
  handleEdit = () => {
    this.setState({
      editVisble: true
    })
  }
  handleEditOk() {
    updateCategory().then(res => {
      if(res.status == 0) {
        this.setState({
          editVisble: false
        })
      }
    })
  }
  handleEditCancel = () => {
    this.setState({
      editVisble: false
    })
  }
  //删除该分类
  handleDelete = () => {
    confirm({
      title: '确定删除该商品分类?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        
      },
      onCancel() {},
    });
  }

  render() {
    const { currentIndex, data, currentName, currentChildName, currentId } = this.props
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
          currentId === 0 ? 
            <Form {...formItemLayout}>
              <div className='title'>
                <h2>一级商品信息</h2>
              </div>
              <Form.Item label="分类名称">
                {getFieldDecorator('categoryName', {
                  initialValue: currentName,
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="启用状态">
                {getFieldDecorator('status', {
                  rules: [{ required: true, message: 'Please select your gender!' }],
                })(
                  <Switch loading={switchLoading} defaultChecked />
                )}
              </Form.Item>
              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" style={{"marginRight": "20px"}} onClick={this.handleAdd}>添加商品</Button>
                <Button type="primary" style={{"marginRight": "20px"}} onClick={this.handleEdit}>修改商品</Button>
                <Button type="danger" onClick={this.handleDelete}>删除商品</Button>
              </Form.Item>
            </Form>
            :
            <Form {...formItemLayout}>
              <div className='title'>
                <h2>次级商品信息</h2>
              </div>  
              <Form.Item label="所属上级商品">
                {getFieldDecorator('parentProduct', {
                  initialValue: currentName,
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Select ant-col-xm-24 ant-col-sm-12>
                    {
                      data.map((categoryItem, index) => {
                        return (
                          <Option value={index}>{categoryItem.name}</Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="分类名称">
                {getFieldDecorator('categoryName', {
                  initialValue: currentChildName,
                  rules: [{ required: true, message: 'Please input your note!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item label="启用状态">
                {getFieldDecorator('status', {
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
          <Modal
            title="添加商品分类名称"
            visible={this.state.addVisible}
            onOk={this.handleAddOk}
            onCancel={this.handleAddCancel}
            okText="确认"
            cancelText="取消"
          >
          </Modal>
          <Modal
            title="修改商品分类名称"
            visible={this.state.editVisble}
            onOk={this.handleEditOk}
            onCancel={this.handleEditCancel}
            okText="确认"
            cancelText="取消"
          >
          </Modal>
      </div>
    )
  }
}
const categoryMenuForm = Form.create()(categoryMenu)
export default categoryMenuForm;