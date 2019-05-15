/** 
 * @Author: Reeyou   
 * @Date: 2019-05-15 16:35:37  
 * @Params: 面包屑组件  
 * **/
import React, {Component} from 'react'
import { Breadcrumb } from 'antd';
import './index.less'

export default class PageBread extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="PageBread">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application Center</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">Application List</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}