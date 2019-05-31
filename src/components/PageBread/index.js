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
      console.log(this.state.routers)
      this.getPath()
    })
  }
  // 
  getPath() {
   let resultPath = []
    this.state.routers.map(item => {
        resultPath.push({
          path: item.path,
          upperName: item.upperName,
          name: item.name
        })
    })
    this.setState({
      routerPath: resultPath
    },() => {
      console.log(this.state.routerPath)
    })
  }



  
  render() {
    const currenPath = window.location.hash.substr(1).split('#')
    console.log(currenPath)
    //先筛选路径匹配的路由参数，再进行渲染
    const samePath = this.state.routerPath.filter(item => {
      item in currenPath
    })
    console.log(samePath)
    const renderBread = this.state.routerPath.map(item => {
        let result = []
        if(currenPath.indexOf(item.path)) {
          result.push(
            <Breadcrumb>
              <Breadcrumb.Item>
                <Icon type="home" />
                <span>首页</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={item.path}>{item.upperName}</Link>
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
          // MainRouters.map((item, index) => {
          //   if(item.routers) {
          //     return <div>
          //       <Breadcrumb>
          //         <Breadcrumb.Item>
          //           <Icon type="home" />
          //           <span>首页</span>
          //         </Breadcrumb.Item>
          //         <Breadcrumb.Item>
          //           <Link to={item.path}>{item.upperName}</Link>
          //         </Breadcrumb.Item>
          //         <Breadcrumb.Item>{item.routers[0].name}</Breadcrumb.Item>
          //       </Breadcrumb>
          //     </div>
          //   } 
          // })
        }
      </div>
    )
  }
}