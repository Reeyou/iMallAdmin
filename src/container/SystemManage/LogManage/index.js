/** 
  @Author: Reeyou
  @Params: 日志管理 
**/

import React, { Component } from 'react'
import PageTable from '@/components/PageTable'
import { Button, Tag } from 'antd';
import  { 
  getProductList
 } from '@/services/productApi'
 import '@/assets/css/global.less'

class LogManage extends Component {
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
      if(res.code == 200) {
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
      name: '商品名称',
      key: '商品名称',
      type: 'Input'
    },
    {
      name: '商品分类',
      key: '商品分类',
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
    {
      name: '商品分类',
      key: '商品Id',
      type: 'Input'
    },
    {
      name: '创建时间',
      key: '创建时间',
      type: 'DataPicker'
    }
    
  ]
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
      title: '商品图片',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '商品分类',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '操作',
      render: () => {
        return (
          <div>
            <Button type="primary" className="edit">查看</Button>
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
        <PageTable
          title='日志列表'
          data={this.state.data}
          columns={this.columns}
          filters={this.filters}
        />
      </div>
    )
  }
}
export default LogManage;