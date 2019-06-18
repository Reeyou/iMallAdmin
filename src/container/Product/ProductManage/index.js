/**
  @Author: Reeyou  
  @Params: 商品管理 
**/
import React, { Component } from 'react'
import PageTable from '@/components/PageTable'
import moment from 'moment'
import { Button, Modal, Form, Icon } from 'antd';
import  { 
  getProductList,
  getCategoryList,
  getCategoryChildrenList,
  updateProductStatus
 } from '@/services/productApi'
 import '../index.less'

 const confirm = Modal.confirm
 const statusList = ["销售中", "已下架"]
class ProductManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      pageSize: 10,
      data: [],
      categoryData: [],
      categoryDataList: []
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
  //添加商品
  addProduct = () => {
    this.props.history.push('/productManage/addProduct')
    
  }
  //删除商品
  handleDelete = () => {
    confirm({
      title: '删除商品',
      content: '是否删除该商品？',
      cancelText: '取消',
      okText: '确认',
      onOk() {
        
      },
      onCancel() {},
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
      dataIndex: 'id',
      key: 'id',
      width: 200
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: 400
    },
    {
      title: '商品图片',
      dataIndex: 'mainImage',
      key: 'mainImage',
      width: 200,
      render: (img) => {
        return (
          <div>
            <img style={{width: '80px', height: "68px", border: '1px solid #f5f5f5', borderRadius: '6px'}} src={img.split(',')[0]}/>
          </div>
        )
      }
    },
    {
      title: '价格(元)',
      dataIndex: 'price',
      key: 'price',
      width: 200
    },
     {
      title: '库存(件)',
      dataIndex: 'stock',
      key: 'stock',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (status) => {
        return (
          <div>
            <span>{statusList[status]}</span>
          </div>
        )
      }
    },
    {
      title: '添加时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 300,
      render: (time) => (
          <span>{moment(time).format("YYYY-MM-DD HH:mm:ss")}</span>
      )
    },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      render: (record) => {
        return (
          <div>
            <Button type="primary" className="edit" onClick={() => this.props.history.push(`/productManage/lookProduct?${record.id}`)}>查看</Button>
            <Button type="danger" className="edit edit_right" onClick={() => this.handleDelete()}>删除</Button>
          </div>
        )
      }
    },
  ]; 
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 5 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    return (
      <div>
        <PageTable
          scroll={{ x: 1500, y : 1400 }}
          title='商品列表'
          data={this.state.data}
          columns={this.columns}
          filters={this.filters}
          onAddBtn={{
            onAdd: this.addProduct,
            text: '添加商品'
          }}
        />
      </div>
    )
  }
}
const ProductManageForm = Form.create()(ProductManage)
export default ProductManageForm;