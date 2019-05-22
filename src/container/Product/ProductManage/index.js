/**
  @Author: Reeyou  
  @Params: 商品管理 
**/
import React, { Component } from 'react'
import Header from '@/components/Index/header'
import Menu from '@/components/Menu'
import PageTable from '@/components/PageTable'
import PageBread from '@/components/PageBread'
import { Divider, Tag } from 'antd';
import  { 
  getProductList,
  addOrUpdateProduct,
  getProductDetail,
  updateProductStatus
 } from '@/services/productApi'
 import '../index.less'

 const statusList = ["上架中", "已下架"]
class ProductManage extends Component {
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
  
  columns = [
    {
      title: '商品Id',
      dataIndex: 'categoryId',
      key: 'icategoryIdd',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
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
            <span className="edit">查看</span>
            <span className="edit edit_right">编辑</span>
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
        {/* <PageBread />   */}
        <PageTable
          title='商品列表'
          data={this.state.data}
          columns={this.columns}
        />
      </div>
    )
  }
}
export default ProductManage;