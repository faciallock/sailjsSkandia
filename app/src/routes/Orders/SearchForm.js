import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';

import {
    Form, Divider,Icon, Button, LocaleProvider, Row, Col, Input, DatePicker 
} from 'antd';

const FormItem = Form.Item;
const SearchForm = Form.create()(

    class extends React.Component {



        handleClear = () => {
            
                this.props.form.resetFields();
                this.props.form.validateFields((err, values) => {
                    console.log('Received values of form: ', values);
      
                    this.props.handleSearch(values);
      
                  });
            
        }

        renderFields = (userType, getFieldDecorator) => {
        return (
            <div>
                {
                    userType == 'D' &&
                        <div>
                            <Row gutter={24}>
                                {/* { localStorage.getItem('userType') != "D" &&
                                <Col lg={6} md={12} sm={12} xs={24} key="CustomerNumber">
                                    <FormItem>
                                        {getFieldDecorator("CustomerNumber", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<Icon type="solution" style={{ color: '#1d2d5c' }} />} placeholder="Customer number" />
                                        )}
                                        </FormItem>
                                </Col>
                                } */}
                                <Col lg={8} md={8} sm={8} xs={24} key="OrderNumber">
                                    <FormItem>
                                        {getFieldDecorator("OrderNumber", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                                
                                        }]
                                        })(
                                        <Input  prefix={<Icon type="file-text" style={{ color: '#1d2d5c' }} />} placeholder="Order number" />
                                        )}
                                        </FormItem>
                                </Col>
                                <Col lg={8} md={8} sm={8} xs={24} key="Sidemark">
                                    <FormItem>
                                        {getFieldDecorator("Sidemark", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<Icon type="tag-o" style={{ color: '#1d2d5c' }}/>} placeholder="Sidemark" />
                                        )}
                                        </FormItem>
                                </Col>
                                <Col lg={8} md={8} sm={8} xs={24} key="ShippedBy">
                                    <FormItem>
                                        {getFieldDecorator("ShippedBy", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })( 
                                        <Input prefix={<Icon type="shop" style={{ color: '#1d2d5c' }} />} placeholder="Shipped By" />
                                        )}
                                        </FormItem>
                                </Col>
                                {/* { localStorage.getItem('userType') != "D" &&
                                <Col lg={6} md={12} sm={12} xs={24} key="Name">
                                    <FormItem>
                                        {getFieldDecorator("Name", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<Icon type="user" style={{ color: '#1d2d5c' }} />} placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>} */}
                            </Row>
                            <Row gutter={24}>
                                
                                {/* { localStorage.getItem('userType') != "D" &&
                                <Col lg={3} md={6} sm={6} xs={12} key="TotalPrice">
                                    <FormItem>
                                        {getFieldDecorator("TotalPrice", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<span style={{ color: '#1d2d5c' }} >$</span>} placeholder="Total Price" />
                                        )}
                                        </FormItem>
                                </Col>} */}
                                <Col lg={8} md={8} sm={8} xs={24} key="Status">
                                    <FormItem>
                                        {getFieldDecorator("Status", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })( 
                                        <Input prefix={<Icon type="check-circle-o" style={{ color: '#1d2d5c' }}/>} placeholder="Status" />
                                        )}
                                    </FormItem>
                                </Col>
                                
                                <Col lg={8} md={8} sm={8} xs={12} key="OrderDate">
                                    <FormItem>
                                        {getFieldDecorator('OrderDate', { type: 'object', required: false })(
                                            <DatePicker placeholder="Order date"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col lg={8} md={8} sm={8} xs={12}  key="ShippedDate">
                                    <FormItem>
                                        {getFieldDecorator('ShippedDate', { type: 'object', required: false })(
                                            <DatePicker placeholder="Shipped date" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>
                        
                }
                {
                    userType !== 'D' &&
                        <div>
                            <Row gutter={24}>
                                { localStorage.getItem('userType') != "D" &&
                                <Col lg={6} md={12} sm={12} xs={24} key="CustomerNumber">
                                    <FormItem>
                                        {getFieldDecorator("CustomerNumber", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<Icon type="solution" style={{ color: '#1d2d5c' }} />} placeholder="Customer number" />
                                        )}
                                        </FormItem>
                                </Col>
                                }
                                <Col lg={6} md={12} sm={12} xs={24} key="OrderNumber">
                                    <FormItem>
                                        {getFieldDecorator("OrderNumber", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                                
                                        }]
                                        })(
                                        <Input  prefix={<Icon type="file-text" style={{ color: '#1d2d5c' }} />} placeholder="Order number" />
                                        )}
                                        </FormItem>
                                </Col>
                                <Col lg={6} md={12} sm={12} xs={24} key="Sidemark">
                                    <FormItem>
                                        {getFieldDecorator("Sidemark", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<Icon type="tag-o" style={{ color: '#1d2d5c' }}/>} placeholder="Sidemark" />
                                        )}
                                        </FormItem>
                                </Col>
                                { localStorage.getItem('userType') != "D" &&
                                <Col lg={6} md={12} sm={12} xs={24} key="Name">
                                    <FormItem>
                                        {getFieldDecorator("Name", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<Icon type="user" style={{ color: '#1d2d5c' }} />} placeholder="Name" />
                                        )}
                                    </FormItem>
                                </Col>}
                            </Row>
                            <Row gutter={24}>
                                <Col lg={6} md={12} sm={12} xs={12} key="ShippedBy">
                                    <FormItem>
                                        {getFieldDecorator("ShippedBy", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })( 
                                        <Input prefix={<Icon type="shop" style={{ color: '#1d2d5c' }} />} placeholder="Shipped By" />
                                        )}
                                        </FormItem>
                                </Col>
                                { localStorage.getItem('userType') != "D" &&
                                <Col lg={3} md={6} sm={6} xs={12} key="TotalPrice">
                                    <FormItem>
                                        {getFieldDecorator("TotalPrice", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })(
                                        <Input prefix={<span style={{ color: '#1d2d5c' }} >$</span>} placeholder="Total Price" />
                                        )}
                                        </FormItem>
                                </Col>}
                                <Col lg={3} md={6} sm={6} xs={12} key="Status">
                                    <FormItem>
                                        {getFieldDecorator("Status", {
                                            rules: [{
                                                required: false,
                                                message: '',
                                        }],
                                        })( 
                                        <Input prefix={<Icon type="check-circle-o" style={{ color: '#1d2d5c' }}/>} placeholder="Status" />
                                        )}
                                    </FormItem>
                                </Col>
                                
                                <Col lg={6} md={12} sm={12} xs={12} key="OrderDate">
                                    <FormItem>
                                        {getFieldDecorator('OrderDate', { type: 'object', required: false })(
                                            <DatePicker placeholder="Order date"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col lg={6} md={12} sm={12} xs={12}  key="ShippedDate">
                                    <FormItem>
                                        {getFieldDecorator('ShippedDate', { type: 'object', required: false })(
                                            <DatePicker placeholder="Shipped date" />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </div>

                }

            </div>
            );

        }


        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
              console.log('Received values of form: ', values);

              this.props.handleSearch(values);

            });
        }

        render() {
            //const { visible, onOK, data,loading } = this.props;
            
            const { getFieldDecorator } = this.props.form;;
            return (
                <div>
                    
                <LocaleProvider locale={en_US}>
                <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
                >
                <Divider />

                {this.renderFields(localStorage.getItem('userType'), getFieldDecorator)}

                {/* <Row gutter={24}>
                { localStorage.getItem('userType') != "D" &&
                <Col lg={6} md={12} sm={12} xs={24} key="CustomerNumber">
                    <FormItem>
                        {getFieldDecorator("CustomerNumber", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input prefix={<Icon type="solution" style={{ color: '#1d2d5c' }} />} placeholder="Customer number" />
                        )}
                        </FormItem>
                </Col>
                }
                <Col lg={6} md={12} sm={12} xs={24} key="OrderNumber">
                    <FormItem>
                        {getFieldDecorator("OrderNumber", {
                            rules: [{
                                required: false,
                                message: '',
                                
                        }]
                        })(
                        <Input  prefix={<Icon type="file-text" style={{ color: '#1d2d5c' }} />} placeholder="Order number" />
                        )}
                        </FormItem>
                </Col>
                <Col lg={6} md={12} sm={12} xs={24} key="Sidemark">
                    <FormItem>
                        {getFieldDecorator("Sidemark", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input prefix={<Icon type="tag-o" style={{ color: '#1d2d5c' }}/>} placeholder="Sidemark" />
                        )}
                        </FormItem>
                </Col>
                { localStorage.getItem('userType') != "D" &&
                <Col lg={6} md={12} sm={12} xs={24} key="Name">
                    <FormItem>
                        {getFieldDecorator("Name", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input prefix={<Icon type="user" style={{ color: '#1d2d5c' }} />} placeholder="Name" />
                        )}
                    </FormItem>
                </Col>}
                </Row>
                <Row gutter={24}>
                <Col lg={6} md={12} sm={12} xs={12} key="ShippedBy">
                    <FormItem>
                        {getFieldDecorator("ShippedBy", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })( 
                        <Input prefix={<Icon type="shop" style={{ color: '#1d2d5c' }} />} placeholder="Shipped By" />
                        )}
                        </FormItem>
                </Col>
                { localStorage.getItem('userType') != "D" &&
                <Col lg={3} md={6} sm={6} xs={12} key="TotalPrice">
                    <FormItem>
                        {getFieldDecorator("TotalPrice", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input prefix={<span style={{ color: '#1d2d5c' }} >$</span>} placeholder="Total Price" />
                        )}
                        </FormItem>
                </Col>}
                <Col lg={3} md={6} sm={6} xs={12} key="Status">
                    <FormItem>
                        {getFieldDecorator("Status", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })( 
                        <Input prefix={<Icon type="check-circle-o" style={{ color: '#1d2d5c' }}/>} placeholder="Status" />
                        )}
                    </FormItem>
                </Col>
                
                <Col lg={6} md={12} sm={12} xs={12} key="OrderDate">
                    <FormItem>
                        {getFieldDecorator('OrderDate', { type: 'object', required: false })(
                            <DatePicker placeholder="Order date"/>
                        )}
                    </FormItem>
                </Col>
                <Col lg={6} md={12} sm={12} xs={12}  key="ShippedDate">
                    <FormItem>
                        {getFieldDecorator('ShippedDate', { type: 'object', required: false })(
                            <DatePicker placeholder="Shipped date" />
                        )}
                    </FormItem>
                </Col>
                </Row> */}
                <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit"><Icon type="search" /> Search</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleClear}>
                Clear
                </Button>
                </Col>
                </Row>
                </Form>
                </LocaleProvider>

                    
                </div>
            );
        }
    }
);
export default SearchForm;