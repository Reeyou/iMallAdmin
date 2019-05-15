/**
  @Author: Reeyou  
  @Params: 首页
**/
import React, { Component } from 'react'
import Header from '@/components/Index/header'
import Menu from '@/components/Menu'

class Home extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <Header />
        <Menu />
        <h1>首页</h1>
      </div>
    )
  }
}
export default Home;