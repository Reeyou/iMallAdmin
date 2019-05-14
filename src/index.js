import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'mobx-react'
import stores from './store'
import '@/assets/css/reset.css'
import '@/assets/iconfont/iconfont.css'
import App from './routers'

ReactDom.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
)