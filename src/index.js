import React from 'react'
import ReactDom from 'react-dom'
import Index from './container/Index'
import { Provider } from 'mobx-react'
import stores from './store'
import '@/assets/css/reset.css'
import '@/assets/iconfont/iconfont.css'

ReactDom.render(
  <Provider {...stores}>
    <Index />
  </Provider>,
  document.getElementById('root')
)