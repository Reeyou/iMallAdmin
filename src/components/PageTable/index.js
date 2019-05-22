/** 
 * @Author: Reeyou   
 * @Date: 2019-05-15 16:25:37  
 * @Params: 表格组件  
 * **/
import React, {Component} from 'react'
import { Table, Pagination , Tag } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './index.less'


export default class PageTable extends Component {
  constructor(props) {
    super(props),
    this.state = {
      total: 200
    };
  }
  showSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  handleChangePage() {
    console.log('Page: ', pageNumber);
  }

  render() {
    const {data, dataSource, columns, title} = this.props
    // console.log("111111111")
    // console.log(this.props)
    return (
      <div className='table'>
        <div className="title">
          <h2>{title}</h2>
        </div>
        <Table 
          columns={columns} 
          dataSource={data.list === undefined ? data : data.list} 
        />
        <div className="page">
          <LocaleProvider locale={zh_CN}>
            <Pagination
              showSizeChanger
              showQuickJumper 
              onChange={this.handleChangePage}
              onShowSizeChange={this.showSizeChange}
              defaultCurrent={1}
              total={data.total}
            />
          </LocaleProvider>
        </div>
        <div className="total">
          总共 {data.total} 条信息
        </div>
      </div>
    )
  }
}