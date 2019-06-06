/**
  @Author: Reeyou  
  @Params: 商品分类管理 
**/
import React, { Component } from 'react'
import PageTable from '@/components/PageTable'
import moment from 'moment'
import { 
  Button,
  Modal,
  Input,
  Form,
  Select
} from 'antd';
import  { 
  getCategoryList
 } from '@/services/productApi'
 import '../index.less'

 const confirm = Modal.confirm
 const statusList = ["正常", "已废弃"]
 const levelList = ["一级","二级"]
class CategoryManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      addVisible: false,
      editVisible: false
    }
  }
  componentWillMount() {
    this.getData()
  }

  getData() {
    getCategoryList().then(res => {
      if(res.status == 0) {
        this.setState({
          data: res.data
        })
      }
    })
  }
  //
  handleLinkTo(e) {
    // console.log(e.parentId)
    this.props.history.push(`/categoryManage/categoryChildList/?${e.parentId}`)
  }
  // 添加分类信息
  addProduct = () => {
    this.setState({
      addVisible: true
    })
  }
  handleAddOk = () => {
    this.setState({
      addVisible: false
    })
  }
  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
  }

  // 编辑分类信息
  handleEdit = () => {
    this.setState({
      editVisible: true
    })
  }
  handleEditOk = () => {
    this.setState({
      editVisible: false
    })
  }
  handleEditCancel = () => {
    this.setState({
      editVisible: false
    })
  }

  // 删除分类
  handleDelete = () => {
    confirm({
      title: '删除分类',
      content: '是否删除该分类？',
      cancelText: '取消',
      okText: '确认',
      onOk() {

      },
      onCancel() {}
    })
  }

  filters = [
    {
      name: '分类名称',
      key: '商品名称',
      type: 'Input'
    },
    {
      name: '状态',
      key: '状态',
      type: 'Select',
      statusList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'true',
          label: '正常'
        },
        {
          value: 'false',
          label: '已废弃'
        }
      ]
    },
  ]
  columns = [
    {
      title: '分类id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '级别',
      dataIndex: 'parentId',
      key: 'parentId',
      render: (text) => (
        // console.log()
        text == "0" ? <span>{levelList[0]}</span> : ''
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return (
          status == true ? <span>{statusList[0]}</span> : <span>{statusList[1]}</span>
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time) => (
        <span>{moment(time).format("YYYY-MM-DD HH:mm:ss")}</span>
    )
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <div>
            <Button type="primary" className="edit" onClick={(e) => this.handleLinkTo({parentId: record.id})}>查看分类</Button>
            <Button type="dashed" className="edit" onClick={() => this.handleEdit()}>编辑</Button>
            <Button type="danger" className="edit edit_right" onClick={() => this.handleDelete()}>删除</Button>
          </div>
        )
      }
    },
  ]; 
  render() {
    const { getFieldDecorator } = this.props.form;
    const formLayoutItem = {
      labelCol: {
        sm: { span: 5 },
      },
      wrapperCol: {
        sm: { span: 16 },
      },
    }
    const { Option } = Select
    return (
      <div>
        <PageTable
          title='分类列表'
          data={this.state.data}
          columns={this.columns}
          filters={this.filters}
          onAddBtn={{
            onAdd: this.addProduct,
            text: '添加分类'
          }}
        />
        <Modal
          title='添加分类'
          visible={this.state.addVisible}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          <Form
            {...formLayoutItem}
          >
            <Form.Item
              label='所属分类'
            >
              {getFieldDecorator('forCategory',{
                rules: [],
                initialValue: 0
              })(
                <Select>
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label='分类名称'
            >
              {getFieldDecorator('categoryName',{
                rules: []
              })(
                <Input/>,
              )}
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title='编辑分类'
          visible={this.state.editVisible}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
        >
          <Form
            {...formLayoutItem}
          >
            <Form.Item
              label='所属分类'
            >
              {getFieldDecorator('forCategoryEdit',{
                rules: [],
                initialValue: 0
              })(
                <Select>
                  <Option value='1'>1</Option>
                  <Option value='2'>2</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label='分类名称'
            >
              {getFieldDecorator('categoryNameEdit',{
                rules: []
              })(
                <Input/>,
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>  
    )
  }
}

const CategoryManageForm = Form.create()(CategoryManage)
export default CategoryManageForm;