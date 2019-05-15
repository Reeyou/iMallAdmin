import React, {Component} from 'react'
import './index.less'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='footer'>
        <p>Copyright © 2019-Present iMall. All rights reserved | Design by<span><a href="https://github.com/Reeyou" target='_Blank'>Reeyou</a></span></p>
      </div>
    )
  }
}