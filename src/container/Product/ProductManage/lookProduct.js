/**
  @Author: Reeyou  
  @Params: 商品管理 
**/
import React, { Component } from 'react'
import { Select, InputNumber, Button, Modal, Form, Input, Upload, Icon, message } from 'antd';
import  { 
  addOrUpdateProduct,
  getCategoryList,
  getCategoryChildrenList,
  getProductDetail
 } from '@/services/productApi'
 import '../index.less'

 let timer = null
class LookProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryData: [],
      categoryChildData: [],
      childStatus: false,
      productImgPath: '',
      productDetailPath: '',
      imgSrc: [],
      parentCategoryId: '',
      categoryId: '',
      fileList: [],
      detailFileList: [],
      previewVisible: false,
      previewImage: '',
      previewDetailVisible: false,
      previewDetailImage: '',
    }
  }
  componentWillMount() {
    this.getCategoryData()
    this.fetchProduct()
  }

  componentWillUnmount() {
    clearInterval(timer)
  }


  //获取商品详情
  fetchProduct = () => {
    let productId = this.props.location.search.substr(1).split('?').toString()
    const params = {
      productId: productId
    }
    getProductDetail(params).then(res => {
      if(res.code == 200) {
        this.setState({
          productDetailData: res.data,
          parentCategoryId: res.data.parentCategoryId,
          id: res.data.id,
          categoryId: res.data.categoryId,
          imgSrc: res.data.mainImage.split(','),
          detailImgSrc: res.data.subImages ? res.data.subImages.split(',') : [],
        },() => {
          let file = {}, detailFile = {}
          this.state.imgSrc.map((item, index) => {
              file = {
                uid: index,
                url: item
              }
            this.state.fileList.push(file)
          })
          this.state.detailImgSrc.map((item, index) => {
            detailFile = {
              uid: index,
              url: item
            }
          this.state.detailFileList.push(detailFile)
        })
          if(this.state.categoryId !== null) {
            this.setState({
              childStatus: true
            })
            if(this.state.parentCategoryId == '0') {
              this.handleChangeCategory(this.state.categoryId)
            } else {
              this.handleChangeCategory(this.state.parentCategoryId)
            }
          }
        })
      }
    })
  }

  //
  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  //
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  // 
  handleDetailPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewDetailImage: file.url || file.preview,
      previewDetailVisible: true,
    });
  };

  // 
  handleCancel = () => this.setState({ previewVisible: false });

  // 
  handleDetailCancel = () => this.setState({ previewDetailVisible: false });

  // 
  handleChangeImg = (info) => {
    this.setState({ 
      fileList: info.fileList,
     })
     if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.state.fileList.pop()
      let currentImgList = this.state.fileList 

      currentImgList.push({uid: info.file.uid, url: info.file.response.data})
      this.setState({
        fileList: currentImgList
      })
      let productImgPath = []
      this.state.fileList.map((item, index) => {
        productImgPath.push(item.url)
      })
      let imgPath = productImgPath.join(',')
      this.setState({
        productImgPath: imgPath
      });
    }
  }
  // 
  handleChangeDetail = (info) => {
    this.setState({ 
      detailFileList: info.fileList,
     })
     if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.state.detailFileList.pop()
      let currentDetailImgList = this.state.detailFileList 

      currentDetailImgList.push({uid: info.file.uid, url: info.file.response.data})
      this.setState({
        detailFileList: currentDetailImgList
      })
      let productDetailPath = []
      this.state.detailFileList.map((item, index) => {
        productDetailPath.push(item.url)
      })
      let detailPath = productDetailPath.join(',')
      this.setState({
        productDetailPath: detailPath
      });
    }
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
        // categoryId: res.data.categoryId,
        categoryChildData: res.data.list
      })
    })
  }
  // 子分类选择
  handleChangeCategoryChild(value) {
    this.setState({
      categoryChildId: value
    })
  }
  // 
  updateProduct = () => {
    this.props.form.validateFields((err, values) => {
      if(!err) {
        const params = {
          id: this.state.id,
          categoryId: this.state.categoryId,
          name: values.name,
          mainImage: this.state.productImgPath,
          subImages: this.state.productDetailPath,
          // desc: values.productDesc,
          stock: values.stock,
          price: values.price,
        }
        addOrUpdateProduct(params).then(res => {
          if(res.code == 200) {
            message.success(res.msg)
            timer = setInterval(() => {
              this.props.history.push('/productManage')
            }, 1000)
          }
        })
      } 
    })
  }

  render() {
    const { categoryData, categoryChildData, fileList, detailFileList, productDetailData, parentCategoryId, categoryId, imgSrc } = this.state;
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className='product'>
        <div className="title">
          <h3>查看商品</h3>
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
              }],
              initialValue: productDetailData ? productDetailData.name : ''
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
              }],
              initialValue: productDetailData ? productDetailData.name : ''
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
              }],
              initialValue: productDetailData ? productDetailData.price : ''
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
              }],
              initialValue: productDetailData ? productDetailData.stock : ''
            })(
              <InputNumber style={{width: '40%'}} />
            )}
            <span className="ant-form-text">件</span>
          </Form.Item>
          <Form.Item
            label='商品分类'
            {...formItemLayout}
            // style={{display: 'inline-block'}}
          >
            {getFieldDecorator('categoryName', {
              rules: [{
                required: true,
                message: '请选择商品分类'
              }],
              initialValue: parentCategoryId == '0' ? categoryId : parentCategoryId
            })(
              <Select
                placeholder="请选择分类"
                style={{width: '47%', display: 'inline-block'}}
                onChange={(id) => this.handleChangeCategory(id)}
              >
                {
                  categoryData.map((item,index) => {
                    return <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                  })
                }
              </Select>
            )}
            {getFieldDecorator('categoryChildName', {
              initialValue: parentCategoryId == '0' ? '' : categoryId
            })(
                <Select
                  placeholder="请选择子分类"
                  onChange={(value) => this.handleChangeCategoryChild(value)}
                  style={{width: '47%', display: 'inline-block', marginLeft: '20px'}}
                >
                  {
                    categoryChildData.map((item,index) => {
                      return <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                    })
                  }
                </Select>
            )}
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
                  onChange={this.handleChangeImg}
                >
                  {fileList.length >= 9 ? null : uploadButton}
                  {/* {imgSrc.length < 9 ? <img style={{width: 100, height: 100, display: 'inlien-block'}} src={item} alt=""/> : uploadButton} */}
                </Upload>
            )}
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
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
                fileList={detailFileList}
                onPreview={this.handleDetailPreview}
                onChange={this.handleChangeDetail}
              >
                {detailFileList.length >= 9 ? null : uploadButton}
              </Upload>
            )}
            <Modal visible={this.state.previewDetailVisible} footer={null} onCancel={this.handleDetailCancel}>
              <img alt="example" style={{ width: '100%' }} src={this.state.previewDetailImage} />
            </Modal>
          </Form.Item>
        </Form>
        <div className='btn'>
          <Button type='primary' onClick={this.updateProduct}>更新商品信息</Button>
          <Button type='primary'>取消</Button>
        </div>
      </div>
    )
  }
}
const LookProductForm = Form.create()(LookProduct)
export default LookProductForm;