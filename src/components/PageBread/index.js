/** 
 * @Author: Reeyou   
 * @Date: 2019-05-15 16:35:37  
 * @Params: 面包屑组件  
 * **/
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd';
import './index.less'
import routerList from '../../routers/Routers'

export default class PageBread extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="PageBread">
        {
          routerList.map((item, index) => {
            if(item.routers) {
              return <div>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    {/* <Icon type="home" /> */}
                    <span>首页</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to={item.path}>{item.upperName}</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{item.routers[0].name}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            }
              
          })
        }
      </div>
    )
  }
}