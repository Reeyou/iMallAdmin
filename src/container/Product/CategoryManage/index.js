/**
  @Author: Reeyou  
  @Params: 商品分类管理 
**/
import React, { Component } from 'react'
import Header from '@/components/Index/header'
import Menu from '@/components/Menu'
import PageTable from '@/components/PageTable'
import PageBread from '@/components/PageBread'
import { 
  Button
} from 'antd';
import  { 
  getCategoryList,
  addOrUpdateProduct,
  getProductDetail,
  updateProductStatus
 } from '@/services/productApi'
 import '../index.less'

 const statusList = ["上架中", "已下架"]
 const levelList = ["一级","二级"]
class CategoryManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      pageSize: 10,
      data: []

    }
  }
  componentWillMount() {
    this.getData()
  }

  getData() {
    const params = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize
    }
    getCategoryList(params).then(res => {
      if(res.status == 0) {
        this.setState({
          data: res.data
        },() => {
          // console.log(this.state.data)
        })
      }
    })
    
  }
  //
  handleLinkTo(e) {
    // console.log(e.parentId)
    this.props.history.push(`/categoryList/categoryChildList/?${e.parentId}`)
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
          label: '销售中'
        },
        {
          value: 'false',
          label: '已下架'
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
          status == "true" ? <span>{statusList[status]}</span> : ''
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <div>
            <Button type="primary" className="edit" onClick={(e) => this.handleLinkTo({parentId: record.id})}>查看分类</Button>
            <Button type="dashed" className="edit">编辑</Button>
            <Button type="danger" className="edit edit_right">删除</Button>
          </div>
        )
      }
    },
  ]; 
  render() {
    return (
      <div>
        <Header />
        <Menu />
        <PageBread />
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
      </div>  
    )
  }
}
export default CategoryManage;