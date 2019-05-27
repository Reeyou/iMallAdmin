/**
  @Author: Reeyou  
  @Params: 品类管理 
**/
import React, { Component } from 'react'
import Header from '@/components/Index/header'
import Menu from '@/components/Menu'
import PageTable from '@/components/PageTable'
import { 
  Button
} from 'antd';
import  { 
  getCategoryChildrenList,
  addOrUpdateProduct,
  getProductDetail,
  updateProductStatus
 } from '@/services/productApi'
 import '../index.less'

 const statusList = ["上架中", "已下架"]
 const levelList = ["一级","二级"]
class CategoryChildManage extends Component {
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
    const parentId = this.props.location.search.split('?')[1]
    const params = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      parentId: parentId
    }
    getCategoryChildrenList(params).then(res => {
      if(res.status == 0) {
        this.setState({
          data: res.data
        },() => {
          // console.log(this.state.data)
        })
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
          label: '销售中'
        },
        {
          value: '1',
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
        text == "0" ?  '' : <span>{levelList[1]}</span>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        return (
          <div>
            <span>{statusList[status]}</span>
          </div>
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
      render: () => {
        return (
          <div>
            <Button type="primary" className="edit">编辑</Button>
            <Button type="danger" className="edit edit_right">删除</Button>
          </div>
        )
      }
    },
  ]; 
  render() {
    const { currentIndex, data, childData, selectName, selectChildName, selectParentId } = this.state
    return (
      <div>
        <Header />
        <Menu />
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
export default CategoryChildManage;