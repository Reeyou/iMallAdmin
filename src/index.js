import React from 'react'
import ReactDom from 'react-dom'
import Index from './container/Index'
import { Provider } from 'mobx-react'
import stores from './store'

ReactDom.render(
  <Provider {...stores}>
    <Index />
  </Provider>,
  document.getElementById('root')
)