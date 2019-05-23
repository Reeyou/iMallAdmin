/**
  @Author: Reeyou  
  @Params: 品类管理 
**/
import React, { Component } from 'react'
import Header from '@/components/Index/header'
import MainMenu from '@/components/Menu'
import Category from './leftSideMenu/categoryMenu'
import { 
  Menu,
  Icon ,
  Spin
} from 'antd';
import  { 
  getCategoryList,
  getCategoryChildrenList,
  addCategory,
  updateCategory
 } from '@/services/productApi'
 import './index.less'

 const SubMenu = Menu.SubMenu;

class CategoryManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1,
      pageSize: 10,
      data: [],
      childData: [],
      index: 0,
      tabStatus: false, // 默认收起状态
      currentIndex: 0, // 当前tabIndex
      itemLoading: false,
      selectName: '',
      selectChildName: '',
      selectParentId: 0

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
        this.setState( {
          data: res.data
        },() => {
          console.log(this.state.data)
        })
      }
    })
    
  }
  handleItemClick(e) {
    console.log(e.value)
    this.setState({
      selectValue: e.value,
      selectName: e.name,
      selectParentId: e.parentId
    })
    // 每次请求都会渲染同一组值
    getCategoryChildrenList({parentId: e.value}).then(res => {
      if(res.status == 0) {
        this.setState( {
          childData: res.data,
          itemLoading: true
        },() => {
          this.setState({
            itemLoading: false
          })
        })
      }
    })
  }
  //
  handleChildItemClick(e) {
    this.setState({
      selectChildName: e.name,
      selectParentId: e.parentId
    }) 
  }
  render() {
    const { currentIndex, data, childData, selectName, selectChildName, selectParentId } = this.state
    return (
      <div>
        <Header />
        <MainMenu />
        <div className="categoryWrapper">
          <div className="category_left">
            <h2>分类管理</h2>
            <Menu
              onClick={this.handleClick}
              style={{ width: 256 }}
              defaultOpenKeys={['title']}
              mode="inline"
            >
              <SubMenu
                key="title"
                title={
                  <span>
                    <Icon type="appstore" />
                    <span>商品分类列表</span>
                  </span>
                }
              >
                {
                  data.map((categoryItem, index) => {
                    return (
                      <SubMenu
                        className='itemList'
                        key={index}
                        title={categoryItem.name}
                        onTitleClick={() => this.handleItemClick({value: categoryItem.id, name: categoryItem.name, parentId: categoryItem.parentId})}
                        // loading={this.state.itemLoading}
                      >
                        {
                          childData.map((categoryChildItem, index) => {
                            return (
                              <Menu.Item
                                key={index}
                                onClick={() => this.handleChildItemClick({name: categoryChildItem.name, selectParentId: categoryChildItem.parentId})}
                              >{categoryChildItem.name}</Menu.Item>
                            )
                          })
                        }
                      </SubMenu>
                    )
                  })
                }
              </SubMenu>
            </Menu>
          </div>
          <Category
            currentIndex={currentIndex}
            data={data}
            currentName={selectName}
            currentChildName={selectChildName}
            currentId={selectParentId}
          />
        </div>
      </div>
    )
  }
}
export default CategoryManage;