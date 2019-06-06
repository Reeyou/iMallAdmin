/** 
 * @Author: Reeyou   
 * @Date: 2019-05-15 16:35:37  
 * @Params: 面包屑组件  
 * **/
import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd';
import './index.less'
import MainRouters from '../../routers/Routers'
import getRouters from '../../utils/getRouters'

export default class PageBread extends Component {
  constructor(props) {
    super(props)
    this.state = {
      routers: [],
      routerPath: []
    }
  }

  componentWillMount() {
    this.getResultRouter()
  }
  getResultRouter() {
    let resultRouters = getRouters(MainRouters)
    this.setState({
      routers: resultRouters
    },() => {
      this.getPath()
    })
  }
  // 
  getPath() {
   let resultPath = []
    this.state.routers.map(item => {
        resultPath.push({
          path: item.path,
          key: item.key,
          upperPath: item.upperPath,
          upperName: item.upperName,
          name: item.name
        })
    })
    this.setState({
      routerPath: resultPath
    })
  }



  
  render() {
    const splitPath = window.location.hash.substr(1).split('?')[0]
    let currentPath = ''
    if(splitPath.charAt(splitPath.length - 1) == '/') {
      currentPath = splitPath.slice(0, splitPath.length - 1)
    } else if(splitPath.charAt(splitPath.length - 1) != '/') {
      currentPath = splitPath.slice(0, splitPath.length)
    }
    //先筛选路径匹配的路由参数，再进行渲染
    const renderBread = this.state.routerPath.map(item => {
        let result = []
        if(currentPath == item.path && item.upperName !== undefined) { 
          result.push(
            <Breadcrumb key={item.key}>
              <Breadcrumb.Item>
                <Icon type="home" />
                <span>首页</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={item.upperPath}>{item.upperName}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
            </Breadcrumb>
          )
        } else {
          result = []
        }
        return result;
    })
    return (
      <div className="PageBread">
        {
          renderBread
        }
      </div>
    )
  }
}