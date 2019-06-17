/**
  @Author: Reeyou  
  @Params: 品类管理 
**/
import React, { Component } from 'react'
import PageTable from '@/components/PageTable'
import { 
  Button,
  Modal,
  Input,
  Form,
  Select,
  message
} from 'antd';
import  { 
  getCategoryChildrenList,
  getCategoryDetail,
  addCategory,
  updateCategory,
  deleteCategory,
  updataCategoryStatus
 } from '@/services/productApi'
 import moment from 'moment'
 import '../index.less'

 const confirm = Modal.confirm
 const statusList = ["正常", "已废弃"]
 const levelList = ["一级","二级"]
class CategoryChildManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      addVisible: false,
      editVisible: false,
      parentId: this.props.location.search.split('?')[1]
    }
  }
  componentWillMount() {
    this.getData()
  }

  getData() {
    const params = {
      parentId: this.state.parentId
    }
    getCategoryChildrenList(params).then(res => {
      if(res.code == 200) {
        this.setState({
          data: res.data
        })
      }
    })
    const detailParams = {
      categoryId: this.state.parentId
    }
    getCategoryDetail(detailParams).then(res => {
      if(res.code == 200) {
        this.setState({
           parentName: res.data.name
        })
      }
    })
  }
   // 添加子分类信息
   addProduct = () => {
    this.setState({
      addVisible: true
    })
  }
  handleAddOk = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const params = {
          parentId: this.state.parentId,
          categoryName: values.categoryName
        }
        addCategory(params).then(res => {
          if(res.code == 200) {
            message.success(res.msg)
            this.getData()
          } else {
            message.error(res.msg)
          }
        })
      }
    })
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
  handleEdit = (val) => {
    const params = {
      categoryId: val.categoryId
    }
    this.setState({
      categoryId: val.categoryId
    })
    console.log(params)
    getCategoryDetail(params).then(res => {
      if(res.code == 200) {
        this.setState({
          categoryChildName: res.data.name
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
            message.success(res.msg)
            this.getData()
          } else {
            message.error(res.msg)
          }
        })
        this.setState({
          editVisible: false
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
      title: '删除子分类',
      content: '是否删除该子分类？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        deleteCategory({categoryId: val.categoryId}).then(res => {
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
          value: '0',
          label: '正常'
        },
        {
          value: '1',
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
        text == "0" ?  '' : <span>{levelList[1]}</span>
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
      render: (Record) => {
        return (
          <div>
            <Button type="primary" className="edit" onClick={(val) => this.handleEdit({categoryId: Record.id})}>编辑</Button>
            <Button type="danger" className="edit edit_right" onClick={(val) => this.handleDelete({categoryId: Record.id})}>删除</Button>
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
          title='分类子列表'
          data={this.state.data}
          columns={this.columns}
          filters={this.filters}
          onAddBtn={{
            onAdd: this.addProduct,
            text: '添加子分类'
          }}
        />
        <Modal
          title='添加子分类'
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
                initialValue: this.state.parentName
              })(
                <Input readOnly/>
              )}
            </Form.Item>
            <Form.Item
              label='子分类名称'
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
          title='编辑子分类'
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
                initialValue: this.state.parentName
              })(
                <Input disabled/>
              )}
            </Form.Item>
            <Form.Item
              label='子分类名称'
            >
              {getFieldDecorator('categoryNameEdit',{
                rules: [],
                initialValue: this.state.categoryChildName
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
const CategoryChildManageForm = Form.create()(CategoryChildManage)
export default CategoryChildManageForm;