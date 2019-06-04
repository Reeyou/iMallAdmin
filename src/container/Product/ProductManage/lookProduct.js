/**
  @Author: Reeyou  
  @Params: 商品管理 
**/
import React, { Component } from 'react'
import { Select, InputNumber, Button, Modal, Form, Input, Upload, Icon, message } from 'antd';
import  { 
  getProductList,
  addOrUpdateProduct,
  getProductDetail,
  updateProductStatus
 } from '@/services/productApi'
 import '../index.less'

 const confirm = Modal.confirm
 const statusList = ["上架中", "已下架"]
class LookProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    }
  }
  componentWillMount() {

  }


  //添加商品
  addProduct = () => {
    this.setState({
      addVisible: true
    })
    
  }
  handleAddOk = () => {
    // addOrUpdateProduct().then(res => {
    //   if(res.status == 0) {
    //     console.log(111)
    //     console.log(res.data)
    //   }
    // })
  }
  handleAddCancel = () => {
    this.setState({
      addVisible: false
    })
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

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };
    const formSmItemLayout = {
      labelCol: {
        sm: { span: 4 },
      },
      wrapperCol: {
        sm: { span: 12 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className='addProduct'>
        <div className="title">
          <h3>查看商品</h3>
        </div>
        <Form>
          <Form.Item
            label='商品名称'
            {...formItemLayout}
          >
            {getFieldDecorator('productName', {
              rules: []
            })(
              <Input style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            label='商品描述'
            {...formItemLayout}
          >
            {getFieldDecorator('productDesc', {
              rules: []
            })(
              <Input style={{width: '100%'}} />
            )}
          </Form.Item>
          <Form.Item
            {...formSmItemLayout}
            label='商品价格'
          >
            {getFieldDecorator('productPrice', {
              rules: []
            })(
              <InputNumber style={{width: '40%'}} />
            )}
            <span className="ant-form-text">元</span>
          </Form.Item>
          <Form.Item
            {...formSmItemLayout}
            label='商品库存'
          >
            {getFieldDecorator('productStock', {
              rules: []
            })(
              <InputNumber style={{width: '40%'}} />
            )}
            <span className="ant-form-text">件</span>
          </Form.Item>
          <Form.Item
            label='商品分类'
            {...formSmItemLayout}
          >
            {getFieldDecorator('productLevel', {
              rules: []
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label='上传图片'
            {...formItemLayout}
          >
            {getFieldDecorator('productImg', {
              rules: []
            })(
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
              >
                {fileList.length >= 9 ? null : uploadButton}
              </Upload>
            )}
          </Form.Item>
        </Form>
        <div className='btn'>
          <Button type='primary'>添加</Button>
        </div>
      </div>
    )
  }
}
const LookProductForm = Form.create()(LookProduct)
export default LookProductForm;