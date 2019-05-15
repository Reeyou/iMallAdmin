/** 
 * @Author: Reeyou   
 * @Date: 2019-05-14 17:53:12  
 * @Params:页面切换加载提示  
 * **/
import React from 'react'
import { Spin } from 'antd'

const PageLoading = ((success, err) => {
  if(success) {
    return <div style={{textAlign: 'center', margin: '80px 0'}}><Spin /></div>
  } else if(err) {
    return <div style={{padding: '28px'}}>Sorry, there was a problem loading this page!</div>
  } else {
    return null
  }
})
export default PageLoading;
