import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';

import {
    Form, Divider,Icon, Button, LocaleProvider, Row, Col, Input, Radio , Card, Select
} from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;
const Option = Select.Option;


const SearchForm = Form.create()(

    class extends React.Component {
        constructor(props) {
            super(props);
    
            this.state = {
                customerNumberIsDisabled:false,
                customerNameIsDisabled:true,
                currentTypeNameSearch:'containsName'
            };
        }

        componentDidMount() { 
                this.customerNumberInp.focus();
            
        }



        handleClear = () => {
            
                this.props.form.resetFields();
                this.props.form.validateFields((err, values) => {
                    console.log('Received values of form: ', values);
      
                    this.props.handleSearch(values);
      
                  });
            
        }

        onChange=(e)=> {
            console.log(`radio checked:${e.target.value}`);

            this.props.form.resetFields();
            
            if(e.target.value==='a'){
                this.setState({
                    customerNumberIsDisabled:false,
                    customerNameIsDisabled:true
                });

                //this.myInp.focus()
                setTimeout(() => {
                    this.customerNumberInp.focus();
                }, 400);

                //document.getElementById("txtCustomerNumber").focus();
            }
            if(e.target.value==='b'){
                this.setState({
                    customerNumberIsDisabled:true,
                    customerNameIsDisabled:false,
                    customerName:''
                })

                

                setTimeout(() => {
                    this.customerNameInp.focus();
                    
                }, 400);
            }

            
          }

        handleChange = (value)=> {
            console.log(`selected ${value}`);
            this.setState({currentTypeNameSearch:value});
          }

        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
              console.log('Received values of form: ', values);
              values.typeSearch=this.state.currentTypeNameSearch;

              this.props.handleSearch(values);

            });
        }

        render() {
            //const { visible, onOK, data,loading } = this.props;
            
            const { getFieldDecorator } = this.props.form;
            const { customerNumberIsDisabled, customerNameIsDisabled } = this.state;
            
            return (
                <div>
                    
                <LocaleProvider locale={en_US}>

                <div>
                    <Divider/>

                    <Row style={{textAlign:'center',margin:'1rem'}} gutter={12}>
                Please select a search by: <RadioGroup onChange={this.onChange} defaultValue="a" buttonStyle="outline">
                            <Radio.Button autoFocus value="a"># Number</Radio.Button>
                            <Radio.Button value="b"><Icon type="user" style={{ color: '#1d2d5c' }}/> Name</Radio.Button>
                        </RadioGroup>
                </Row>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >

                

                <Card>

                    <Row gutter={12}>
                        <Col lg={6} md={6} sm={24} xs={24}>
                        </Col>
                        <Col lg={4} md={4} sm={12} xs={24} key="CustomerNumber">
                        
                            <FormItem>
                                {getFieldDecorator("CustomerNumber", {
                                    rules: [{
                                        required: false,
                                        message: '',
                                        
                                }]
                                })(
                                <Input ref={(ip) => this.customerNumberInp = ip} disabled={customerNumberIsDisabled}  prefix={<span style={{ color: '#1d2d5c' }} >#</span>} placeholder="Customer Number" />
                                )}
                                </FormItem>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={24} key="CustomerName">
                            <FormItem>
                                {getFieldDecorator("CustomerName", {
                                    rules: [{
                                        required: false,
                                        message: '',
                                }]
                                })(
                                    <span>
                                    <InputGroup style={{marginTop:'4px'}} compact>
                                    <Select onChange={this.handleChange} disabled={ customerNameIsDisabled}  defaultValue="Contains">
                                        <Option value="startsWithName">Starts with</Option>
                                        <Option value="containsName">Contains</Option>
                                    </Select>
                                    <Input ref={(ip) => this.customerNameInp = ip} disabled={ customerNameIsDisabled} prefix={<Icon type="user" style={{ color: '#1d2d5c' }}/>}  style={{ width: '60%' }}  placeholder="Customer Name" />
                                    </InputGroup>
                                        {/* <Input  ref={(ip) => this.customerNameInp = ip} disabled={ customerNameIsDisabled} prefix={<Icon type="user" style={{ color: '#1d2d5c' }}/>} placeholder="Customer Name" /> */}
                                    </span>
                                )}
                                </FormItem>
                        </Col>
                        <Col style={{ textAlign: 'left', marginTop:'3px' }} lg={8} md={8} sm={12} xs={24}>
                            <Button type="primary" htmlType="submit"><Icon type="search" /> Search</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleClear}> Clear </Button>
                        </Col>
                        
                    </Row>

                    </Card>
                
                </Form>
                </div>
                </LocaleProvider>

                    
                </div>
            );
        }
    }
);
export default SearchForm;