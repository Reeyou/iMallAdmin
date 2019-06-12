/**
  @Author: Reeyou  
  @Params: 商品管理 
**/
import React, { Component } from 'react'
import { Select, InputNumber, Button, Form, Input, Upload, Icon, message } from 'antd';
import  { 
  addOrUpdateProduct,
  getCategoryList,
  getCategoryChildrenList
 } from '@/services/productApi'
 import '../index.less'

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryData: [],
      categoryChildData: [],
      childStatus: false,
      fileList: [],
      productImgPath: '',
    }
  }
  componentWillMount() {
    this.getCategoryData()
  }
  // 总品类选择
  getCategoryData() {
    getCategoryList().then(res => {
      if(res.code == 200) {
        this.setState({
          categoryData: res.data.list
        })
      }
    })
  }
  // 分类选择
  handleChangeCategory(id) {
    const params = {
      parentId: id
    }
    getCategoryChildrenList(params).then(res => {
      this.setState({
        childStatus: true,
        categoryChildData: res.data.list
      })
    })
  }
  // 子分类选择
  handleChangeCategoryChild(value) {
    this.setState({
      categoryChildId: value.split('-')[0],
      categoryName: value.split('-')[1]
    })
  }
  //添加商品
  handleAddOk = () => {
    this.props.form.validateFields((err, values) => {
      if(err) {

      } else {
        const params = {
          categoryId: this.state.categoryChildId,
          categoryName: this.state.categoryName,
          name: values.name,
          // mainImage: this.state.productImgPath,
          // desc: values.productDesc,
          stock: values.stock,
          price: values.price,

        }
        addOrUpdateProduct(params).then(res => {
          if(res.code == 200) {
            message.success(res.msg)
            setInterval(() => {
              this.props.history.push('/productManage')
            }, 1000)
          }
        })
      }
    })
  } 
  // 添加取消
  handleAddCancel = () => {

  }

  

  //
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = (info) => {
    let productImgPath = []
    // this.state.fileList.map((item, index) => {
    //   productImgPath.push(item.response.data)
    // })
    this.setState({ 
      fileList: info.fileList,
      // productImgPath: info.file.response.data
    })
    if (info.file.status === 'uploading') {
      // this.setState({ frontLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        // frontLoading: false,
        // productImgPath: productImgPath
        productImgPath: info.fileList[0].response.data
        // productImgPath: info.fileList.response.data
      });
    }
  };

  render() {
    const { categoryData, categoryChildData, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 2 },
      },
      wrapperCol: {
        sm: { span: 10 },
      },
    };
    const formImgLayout = {
      labelCol: {
        sm: { span: 2 },
      },
      wrapperCol: {
        sm: { span: 20 },
      },
    };
    const formSmItemLayout = {
      labelCol: {
        sm: { span: 2 },
      },
      wrapperCol: {
        sm: { span: 10 },
      },
    };
    const { Option } = Select
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className='product'>
        <div className="title">
          <h3>添加商品</h3>
        </div>
        <Form>
          <Form.Item
            label='商品名称'
            {...formItemLayout}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: '请输入商品名称'
              }]
            })(
              <Input style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            label='商品描述'
            {...formItemLayout}
          >
            {getFieldDecorator('desc', {
              rules: [{
                required: true,
                message: '请输入商品描述'
              }]
            })(
              <Input style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            {...formSmItemLayout}
            label='商品价格'
          >
            {getFieldDecorator('price', {
              rules: [{
                required: true,
                message: '请输入商品价格'
              }]
            })(
              <InputNumber style={{width: '40%'}} />
            )}
            <span className="ant-form-text">元</span>
          </Form.Item>
          <Form.Item
            {...formSmItemLayout}
            label='商品库存'
          >
            {getFieldDecorator('stock', {
              rules: [{
                required: true,
                message: '请输入商品库存'
              }]
            })(
              <InputNumber style={{width: '40%'}} />
            )}
            <span className="ant-form-text">件</span>
          </Form.Item>
          <Form.Item
            label='商品分类'
            {...formItemLayout}
          >
            {getFieldDecorator('categoryName', {
              rules: [{
                required: true,
                message: '请选择商品分类'
              }],
            })(
              <Select
                placeholder="请选择分类"
                style={{width: '47%', display: 'inline-block'}}
                onChange={(id) => this.handleChangeCategory(id)}
              >
                {
                  categoryData.map((item,index) => {
                    return <Option key={index} value={item.id}>{item.name}</Option>
                  })
                }
              </Select>
            )}
              {
                this.state.childStatus ? 
                (
                  <Select
                    placeholder="请选择子分类"
                    onChange={(value) => this.handleChangeCategoryChild(value)}
                    style={{width: '47%', display: 'inline-block', marginLeft: '20px', borderColor: '#f5222d'}}
                  >
                    {
                      categoryChildData.map((item,index) => {
                        return <Option key={index} value={`${item.id}-${item.name}`}>{item.name}</Option>
                      })
                    }
                  </Select>
                ) : ''
              }
          </Form.Item>
          <Form.Item
            label='上传展示图'
            {...formImgLayout}
          >
            {getFieldDecorator('productImg', {
              rules: [{
                required: true,
                message: '请上传商品展示图'
              }]
            })(
              <Upload
                action="api/admin/uploadImg"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 9 ? null : uploadButton}
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label='上传详情图'
            {...formImgLayout}
          >
            {getFieldDecorator('detailImg', {
              rules: [{
                required: true,
                message: '请上传商品详情图'
              }]
            })(
              <Upload
                action="api/admin/uploadImg"
                listType="picture-card"
                // fileList={fileList}
                // onPreview={this.handlePreview}
                // onChange={this.handleChange}
              >
                {fileList.length >= 9 ? null : uploadButton}
              </Upload>
            )}
          </Form.Item>
        </Form>
        <div className='btn'>
          <Button onClick={this.handleAddOk} type='primary'>添加</Button>
          <Button onClick={this.handleAddCancel}>取消</Button>
        </div>
      </div>
    )
  }
}
const AddProductForm = Form.create()(AddProduct)
export default AddProductForm;