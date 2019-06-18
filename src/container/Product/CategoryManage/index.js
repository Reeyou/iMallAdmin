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
  Select,
  message
} from 'antd';
import  { 
  getCategoryList,
  addCategory,
  updateCategory,
  getCategoryDetail,
  deleteCategory,
  updataCategoryStatus
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
      editVisible: false,
      categoryName: ''
    }
  }
  componentWillMount() {
    this.getData()
  }

  getData() {
    const params = {
      categoryId: 0
    }
    getCategoryList(params).then(res => {
      if(res.code == 200) {
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
  handleAddOk = (field) => {
    this.props.form.validateFields(field,(err, values) => {
      if(!err) {
        console.log(values)
        const params = {
          parentId: 0,
          categoryName: values.categoryName
        }
        addCategory(params).then(res => {
          if(res.code == 200) {
            this.setState({
              addVisible: false
            })
            message.success('添加根节点分类车成功')
            this.props.form.resetFields()
            this.getData()
          } else {
            message.error(res.msg)
          }
        })
      }
    })
    
  }
  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
  }

  // 编辑分类信息
  handleEdit = (val) => {
    const params = {
      categoryId: val.categoryId
    }
    this.setState({
      categoryId: val.categoryId
    })
    getCategoryDetail(params).then(res => {
      if(res.code == 200) {
        this.setState({
          categoryName: res.data.name
        })
      }
    })
    this.setState({
      editVisible: true
    })
  }
  handleEditOk = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const params = {
          categoryId: this.state.categoryId,
          categoryName: values.categoryNameEdit
        }
        updateCategory(params).then(res => {
          if(res.code == 200) {
            this.setState({
              editVisible: false
            })
            message.success('编辑分类操作成功')
            this.props.form.resetFields()
            this.getData()
          } else {
            message.error(res.msg)
          }
        })
      }
    })
  }
  handleEditCancel = () => {
    this.setState({
      editVisible: false
    })
  }

  // 删除分类
  handleDelete = (val) => {
    const that = this
    confirm({
      title: '删除分类',
      content: '是否删除该分类？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        const params = {
          categoryId: val.categoryId
        }
        deleteCategory(params).then(res => {
          if(res.code == 200) {
            message.success(res.msg)
            that.getData()
          } else {
            message.error(res.msg)
          }
        })
      },
      onCancel() {}
    })
  }

  // 
  changeStatus = (val) => {
    const that = this
    let statusText = val.status ? '废弃' : '使用'
    confirm({
      title: '更改品类状态',
      content: `是否${statusText}该品类?`,
      cancelText: '取消',
      okText: '确认',
      onOk() {
        const params = {
          categoryId: val.categoryId,
          status: !val.status
        }
        updataCategoryStatus(params).then(res => {
          if(res.code == 200) {
            message.success(res.msg)
            that.getData()
          } else {
            message.error(res.msg)
          }
        })
      },
      onCancel() {

      }
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
        text == "0" ? <span>{levelList[0]}</span> : ''
      )
    },
    {
      title: '状态',
      key: 'status',
      render: (record) => {
        return (
          record.status == true ? 
          <div style={{fontSize: '14px'}}>正常<span className='upStatus' onClick={(val) => this.changeStatus({categoryId: record.id, status: record.status})}>废弃</span></div>
          : 
          <div style={{fontSize: '14px'}}>已废弃<span className='downStatus' onClick={(val) => this.changeStatus({categoryId: record.id, status: record.status})}>使用</span></div>
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
            <Button type="dashed" className="edit" onClick={(val) => this.handleEdit({categoryId: record.id})}>编辑</Button>
            <Button type="danger" className="edit edit_right" onClick={(val) => this.handleDelete({categoryId: record.id})}>删除</Button>
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
          onOk={() => this.handleAddOk(["forCategory", "categoryName"])}
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
                initialValue: '根节点'
              })(
                <Input disabled />
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
          onOk={() => this.handleEditOk(["forCategoryEdit","categoryNameEdit"])}
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
                initialValue: '根节点'
              })(
                <Input disabled />
              )}
            </Form.Item>
            <Form.Item
              label='分类名称'
            >
              {getFieldDecorator('categoryNameEdit',{
                rules: [],
                initialValue: this.state.categoryName
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