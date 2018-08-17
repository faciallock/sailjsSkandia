import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon,  Tooltip, Col,Dropdown, Divider, Row, Table, DatePicker, TimePicker, Input, Select, Popover } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import FooterToolbar from '../../components/FooterToolbar';
import TableForm from './TableForm';
import CardTotal from './CardTotal';
import ViewOrderTable from './ViewOrderTable';

import styles from './style.less';
import axios from 'axios';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  name: 'Warehouse name',
  url: 'Warehouse Manager',
  owner: 'Owner',
  approver: 'Aprrover',
  dateRange: 'effective date',
  type: 'Warehouse type',
  name2: 'Task name',
  url2: 'mission details',
  owner2: 'Executive',
  approver2: 'Responsible',
  dateRange2: 'Effective date',
  type2: 'Task type',
};

 const tableData = [{
  key: '1',
  workId: '00001',
  name: 'John Brown',
  department: 'New York No. 1 Lake Park',
}, {
  key: '2',
  workId: '00002',
  name: 'Jim Green',
  department: 'London No. 1 Lake Park',
}, {
  key: '3',
  workId: '00003',
  name: 'Joe Black',
  department: 'Sidney No. 1 Lake Park',
}]; 

class ViewOrder extends PureComponent {
  state = {
    width: '100%',
    orderDetail:[]

  };
  componentDidMount() {
    

    window.addEventListener('resize', this.resizeFooterToolbar);
    axios.get('http://localhost:3000/salesOrders?orderId=1').then(res => {
      const orderDetail = res.data;
      console.log(res.data)

      this.setState({ orderDetail });
      
    });    

   
   /*  axios.get('http://localhost:3000/salesOrders?orderId=2').then(res => {
      const orderDetail = res.data;
      console.log(res.data)
      this.setState({ orderDetail });
      this.setState({ salesOrg: orderDetail[0].general.salesOrg })
    }); */

  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
    
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }
  handleClick = (value)=> {
    console.log(this);
    axios.get('http://localhost:3000/salesOrders?orderId=' + value).then(res => {
      const orderDetail = res.data;
      console.log(res.data)
      this.setState({ orderDetail });
      /* this.setState({ salesOrg: orderDetail[0].general.salesOrg }) */
    });
   
    
  }
  render() {
    
    
    //console.log(this.state.persons);

    if (this.state.orderDetail === undefined ) {
        return <div>Loading...</div>
    }
  
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        },
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        },
      },
    };


    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();

    const action = (
      <div>
        <Input.Search
          placeholder="Number Order here"
          onSearch={this.handleClick}
          style={{ width: 300 }}
          enterButton
        />
      </div>
    );
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover title="Form verification information" content={errorList} overlayClassName={styles.errorPopover} trigger="click" getPopupContainer={trigger => trigger.parentNode}>
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };
    let contentPage=``;
    let salesOrg=``;
    let addressSet1 = ``;
    let addressSet2=``;
    let city=``;
    let state=``;
    let zip=``;
    let sideMarkPO=``
    let productionRush=``;
    let delivery=``;
    let packedDate=``;
    let batchDate=``; 
    let invoiceDate=``;
    let invoiceNumer=``;
    let orderWeight=``;
    let orderDate=``;
    let shipperInstruction=``;
    let trackingNumber=``;
    let noPackages=``;
    let shipmentDate=``;
    let freightOverride=``;
    let freight=``;
    let freightCost=``;
    let changesInOrder=[];
    let cardTotal=[];
    if (this.state.orderDetail[0]){
      contentPage = `Company: Interior Motives Two / Account: 00000508880 / Sales Org. ${this.state.orderDetail[0].general.salesOrg}`;
      salesOrg = `${this.state.orderDetail[0].general.salesOrg}`;
      addressSet2= `${this.state.orderDetail[0].shippingInformation.address[1].address}`;
      city = `${this.state.orderDetail[0].shippingInformation.city}`;
      state = `${this.state.orderDetail[0].shippingInformation.state}`;
      zip = `${this.state.orderDetail[0].shippingInformation.zip}`;
      sideMarkPO = `${this.state.orderDetail[0].shippingInformation.sideMarkPO}`;
      productionRush = `${this.state.orderDetail[0].shippingInformation.productionRush}`;
      delivery = `${this.state.orderDetail[0].shippingInformation.delivery}`;
      packedDate = `${this.state.orderDetail[0].shippingInformation.packedDate}`;
      batchDate = `${this.state.orderDetail[0].shippingInformation.batchDate}`;
      invoiceDate = `${this.state.orderDetail[0].shippingInformation.invoiceDate}`;
      invoiceNumer = `${this.state.orderDetail[0].shippingInformation.invoiceNumer}`;
      orderWeight = `${this.state.orderDetail[0].shippingInformation.orderWeight}`;
      orderDate = `${this.state.orderDetail[0].shippingInformation.orderDate}`;
      shipperInstruction = `${this.state.orderDetail[0].freight.shipperInstruction}`;
      trackingNumber = `${this.state.orderDetail[0].freight.trackingNumber}`;
      noPackages = `${this.state.orderDetail[0].freight.noPackages}`;
      shipmentDate = `${this.state.orderDetail[0].freight.shipmentDate}`;
      freight = `${this.state.orderDetail[0].freight.freight}`;
      freightOverride = `${this.state.orderDetail[0].freight.freightOverride}`;
      freightCost = `${this.state.orderDetail[0].freight.freightCost}`;
      changesInOrder= this.state.orderDetail[0].changesInOrder;
      cardTotal = this.state.orderDetail[0].cardTotal;
      
    }
    else{
      /* contentPage = `Company: Interior Motives Two / Account: 00000508880 / Sales Org.`;
      salesOrg=``;
      addressSet1=``;
      addressSet2 = ``;
      city=``;
      state = ``;
      zip = ``;
      sideMarkPO=``;
      productionRush=``;
      delivery=``; 
      packedDate = ``;
      batchDate=``;
      invoiceDate=``;
      invoiceNumer=``;
      orderWeight=``;
      orderDate=``;
      shipperInstruction=``;
      trackingNumber=``;
      noPackages=``;
      shipmentDate=``;
      freight=``;
      freightOverride=``;
      freightCost=``; */
    }
    return(
     
      <PageHeaderLayout title="View Order Details"
        content={contentPage}
        action={action} 
      wrapperClassName={styles.advancedForm}>

        {/* content="Company: Interior Motives Two / Account: 00000508880 / Sales Org.{}"  */}
        <Row gutter={24}>
              <Col lg={14} md={12} sm={24}>
        <Card title="Shipping Information" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={12}>
              <Col lg={8} md={24} sm={24}>
                     <Form.Item label="House No."
                      >
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                          }, {
                            required: true, message: 'Please input your E-mail!',
                          }],
                        })(
                           <label for=""></label>
                        )}
                      </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                     <Form.Item
                     
                        label="Address 1"
                      >
                        {getFieldDecorator('email', {
                          rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                          }, {
                            required: true, message: 'Please input your E-mail!',
                          }],
                        })(
                        <label for="">{addressSet1}</label>
                        )}
                      </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                     <Form.Item
                        label="Address 2"
                      >
                        {
                           <label >{addressSet2}</label>
                        }
                      </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                     <Form.Item
                     
                        label="City"
                      >
                        {
                        <label>{city}</label>
                        }
                      </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                     <Form.Item
                     
                        label="State"
                      >
                        {
                           <label >{state}</label>
                        }
                      </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                     <Form.Item
                     
                        label="Zip"
                      >
                        {
                        <label >{zip}</label>
                        }
                      </Form.Item>
              </Col>

              <Col lg={8} md={24} sm={24}>
                     <Form.Item label="Sidemark/PO">
                      {
                        <label >{sideMarkPO}</label>
                      }
                    </Form.Item>
              </Col>
              
              {localStorage.getItem('userType') != "D" && <Col lg={8} md={12} sm={24}>
                <Form.Item  label="Sales Org">
                
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: '' }],
                  })(
                      <Select value={salesOrg} placeholder="" disabled={true}>
                      </Select>
                  )}
                </Form.Item>
              </Col>}
              <Col lg={8} md={24} sm={24}>
                     <Form.Item
                     
                        label="Production Rush"
                      >
                        {
                        <label >{productionRush}</label>
                        }
                      </Form.Item>
              </Col>
              <Row gutter={10}>
              <Col lg={8} md={24} sm={24}>
                     <Form.Item
                     
                        label="Delivery"
                      >
                        {
                          <label >{delivery}</label>
                        }
                      </Form.Item>
              </Col>
              {localStorage.getItem('userType') != "D" && <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Reference">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Error' }],
                  })(
                    <Input
                      placeholder="" disabled={true}
                    />
                  )}
                </Form.Item>
              </Col>}
              {localStorage.getItem('userType') != "D" && <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Repair/Remake Code">
                
                  {getFieldDecorator('owner', {
                    rules: [{ required: true, message: '' }],
                  })(
                    <Select placeholder="" disabled={true}>
                      <Option value="one">One option</Option>
                      <Option value="second">Second option</Option>
                    </Select>
                  )}
                </Form.Item>
                </Col> }
              <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Packed Date">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Error' }],
                  })(
                          <label >{packedDate}</label>
                  )}
                </Form.Item>
              </Col>
              {localStorage.getItem('userType') != "D" && <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Batch Date">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Error' }],
                  })(
                          <label >{batchDate}</label>
                  )}
                </Form.Item>
                </Col> }
              <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Invoice Date">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Error' }],
                  })(
                          <label >{invoiceDate}</label>
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Invoice Number">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Error' }],
                  })(
                    <label >{invoiceNumer.replace(/^0+/, '')}</label>
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Order Weight">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Error' }],
                  })(
                          <label >{orderWeight}</label>
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={24} sm={24}>
                <Form.Item  label="Order Date">
                  {getFieldDecorator('url', {
                    rules: [{ required: true, message: 'Error' }],
                  })(
                          <label >{orderDate}</label>
                  )}
                </Form.Item>
              </Col>
              
              </Row>
            </Row>
            
          </Form>
        </Card>
        </Col>
          <Col lg={10} md={12} sm={24}>
            <Card title="Freight" className={styles.card} bordered={false}>
              






              
             {/*  <ul>
                {this.state.persons.map(person => <li key={person.id}>{person.name} - {person.email}</li>)}
              </ul> */}









              <Form layout="vertical" hideRequiredMark>
                <Row gutter={12}>
                {localStorage.getItem('userType') != "D" &&<Col lg={24} md={24} sm={24}>
                    <Form.Item  label="Shippers Instruction">
                    {getFieldDecorator('url', {
                      rules: [{ required: true, message: 'Error' }],
                    })(
                      <Input
                      placeholder="" defaultValue={`test ${shipperInstruction}`}
                      />
                    )}
                  </Form.Item>
                  </Col>}
                  <Col lg={8} md={24} sm={24}>
                    <Form.Item  label="Tracking Number">
                      <label >{trackingNumber}</label>
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={24} sm={24}>
                    <Form.Item  label="No. of Packages">
                      {getFieldDecorator('url', {
                        rules: [{ required: true, message: 'Error' }],
                      })(
                        <label >{noPackages}</label>
                      )}
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={24} sm={24}>
                    <Form.Item  label="Shipment Date">
                      {getFieldDecorator('url', {
                        rules: [{ required: true, message: 'Error' }],
                      })(
                        <label >{shipmentDate}</label>
                      )}
                    </Form.Item>
                  </Col>
                  
                </Row>
                <Row gutter={16}>
                  <Col lg={6} md={12} sm={24}>
                      <Form.Item  label="Freight">
                        
                      <Select placeholder="" value={freight}>
                           
                          </Select>
                    </Form.Item>
                  </Col>
                  {localStorage.getItem('userType') != "D" && <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                    <Form.Item  label="Freight Overrride">
                       
                      <Select placeholder="" value={freightOverride}>
                          </Select>
                       
                    </Form.Item>
                    </Col> }
                    {localStorage.getItem('userType') != "D" && <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                    <Form.Item  label="Freight Cost">
                      
                        <label >{freightCost}</label>
                    </Form.Item>
                    </Col> }
                </Row>
              </Form>
            </Card>
            
            
          </Col>
        </Row>
        <Row>
          <ViewOrderTable data={changesInOrder}/>
        </Row>
        <Row>
        
        </Row>
        
        

        <Row gutter={24}>
          <Col lg={24} md={24} sm={24}>
            <Card title="Card Total (Includes Surcharges, but not Shipping/Handling)" bordered={false}>
              {getFieldDecorator('members', {
                initialValue: tableData,
              })(<CardTotal data={cardTotal} />)}
            </Card>
          </Col>
        </Row>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            Submit
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(ViewOrder));
