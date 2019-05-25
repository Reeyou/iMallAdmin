/** 
 * @Author: Reeyou   
 * @Date: 2019-05-15 16:25:37  
 * @Params: 表格组件  
 * **/
import React, {Component} from 'react'
import { Table, Pagination , Form, Input, Row, Col ,Button, Icon, Select, DatePicker } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './index.less'

const Option = Select.Option
const { RangePicker } = DatePicker;


class PageTable extends Component {
  constructor(props) {
    super(props),
    this.state = {
      total: 200,
      // CollapseName: '收起'
    };
  }
  showSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  handleChangePage() {
    console.log('Page: ', pageNumber);
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  //
  renderFormItem(filterItem) {
    let formContent = []
    const { getFieldDecorator } = this.props.form;

    switch (filterItem.type) {
      case 'Input':
        formContent.push(
          <Form.Item label={filterItem.name} style={{padding: "0 10px"}}>
            {getFieldDecorator('input', {
            })(
              <Input style={{ width: '100%' }} placeholder='请输入' />
          )}
          </Form.Item>
        )
      break;
      case 'Select':
        formContent.push(
          <Form.Item label={filterItem.name} style={{padding: "0 10px"}}>
            {getFieldDecorator('select', {
              initialValue: filterItem.statusList[0].label
            })(
              <Select>
                {
                  filterItem.statusList.map((item, index) => (
                    <Option value={item.value} key={index}>{item.label}</Option>
                  ))
                }
              </Select>
            )}
          </Form.Item>
        )
      break;
      case 'DataPicker':
        formContent.push(
          <Form.Item label={filterItem.name} style={{padding: "0 10px"}}>
            {getFieldDecorator('input', {
            })(
              <LocaleProvider locale={zh_CN}>
                <RangePicker style={{width: "100%"}} />
              </LocaleProvider>
            )}
            </Form.Item>
        )
      break;
    }
    return formContent;
  }
  render() {
    const {data, dataSource, columns, filters, title, onAddBtn} = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout  = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    }

    return (
      <div className='table'>
        <div className="title">
          <h2>{title}</h2>
        </div>
        {
          onAddBtn ? 
          <div className='addBtn' onClick={onAddBtn.onAdd}>
            <Button icon="plus" type='primary'>{onAddBtn.text}</Button>
          </div>
          :
          ''
        }
        <Form {...formItemLayout}>
          {
            filters.map((filterItem, index) => {
              return (
                <Col span={8}>
                    {
                      this.renderFormItem(filterItem)
                    }
                </Col>
              )
            })
          }
          <Col span={8} style={{ textAlign: 'left', paddingLeft: '10px' }}>
            <Button type="primary" htmlType="submit">筛选</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
            {/* <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
              {this.state.expand ? <span>展开</span> : <span>收起</span>}
              <Icon type={this.state.expand ? 'down' : 'up'} />
            </a> */}
          </Col>
        </Form>
        <Table 
          columns={columns} 
          filters={filters}
          onAddBtn={onAddBtn}
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

const PageTableForm = Form.create()(PageTable)
export default PageTableForm