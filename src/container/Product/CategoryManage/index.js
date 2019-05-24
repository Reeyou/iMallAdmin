/**
  @Author: Reeyou  
  @Params: 品类管理 
**/
import React, { Component } from 'react'
import Header from '@/components/Index/header'
import Menu from '@/components/Menu'
import PageTable from '@/components/PageTable'
import MainMenu from '@/components/Menu'
import Category from './leftSideMenu/categoryMenu'
import { 
  Icon ,
  Spin,
  Button
} from 'antd';
import  { 
  getProductList,
  addOrUpdateProduct,
  getProductDetail,
  updateProductStatus
 } from '@/services/productApi'
 import '../index.less'

 const statusList = ["上架中", "已下架"]
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
    getProductList(params).then(res => {
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
      dataIndex: 'categoryId',
      key: 'icategoryIdd',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '级别',
      dataIndex: 'price',
      key: 'price',
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
      title: '操作',
      render: () => {
        return (
          <div>
            <Button type="primary" className="edit">查看分类</Button>
            <Button type="dashed" className="edit">编辑</Button>
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
        {/* <PageBread />   */}
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
        {/* <Category
            currentIndex={currentIndex}
            data={data}
            currentName={selectName}
            currentChildName={selectChildName}
            currentId={selectParentId}
          /> */}
      </div>  
    )
  }
}
export default CategoryManage;