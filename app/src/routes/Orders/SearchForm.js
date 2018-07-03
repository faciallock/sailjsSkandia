import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';

import {
    Form, Table, Modal, Button, LocaleProvider, Row, Col, Input, DatePicker 
} from 'antd';
const SearchForm = Form.create()(

    class extends React.Component {


        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
              console.log('Received values of form: ', values);

              this.props.handleSearch(values);

            });
        }

        render() {
            //const { visible, onOK, data,loading } = this.props;
            const FormItem = Form.Item;
            const { getFieldDecorator } = this.props.form;;
            return (
                <div>
                    
                <LocaleProvider locale={en_US}>
                <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
                >

                <Row gutter={24}>
                <Col span={8} key="CustomerNumber">
                    <FormItem>
                        {getFieldDecorator("CustomerNumber", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input placeholder="Customer number" />
                        )}
                        </FormItem>
                </Col>
                <Col span={8} key="OrderNumber">
                    <FormItem>
                        {getFieldDecorator("OrderNumber", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input placeholder="Order number" />
                        )}
                        </FormItem>
                </Col>
                <Col span={8} key="Sidemark">
                    <FormItem>
                        {getFieldDecorator("Sidemark", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input placeholder="Sidemark" />
                        )}
                        </FormItem>
                </Col>
                </Row>
                <Row gutter={24}>
                <Col span={8} key="Name">
                    <FormItem>
                        {getFieldDecorator("Name", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input placeholder="Name" />
                        )}
                        </FormItem>
                </Col>
                <Col span={8} key="OrderDate">
                    <FormItem>
                        {getFieldDecorator('OrderDate', { type: 'object', required: false })(
                            <DatePicker placeholder="Order date"/>
                        )}
                    </FormItem>
                </Col>
                <Col span={8} key="ShippedDate">
                    <FormItem>
                        {getFieldDecorator('ShippedDate', { type: 'object', required: false })(
                            <DatePicker placeholder="Shipped date" />
                        )}
                    </FormItem>
                </Col>
                </Row>
                <Row gutter={24}>
                <Col span={8} key="ShippedBy">
                    <FormItem>
                        {getFieldDecorator("ShippedBy", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input placeholder="Shipped By" />
                        )}
                        </FormItem>
                </Col>
                <Col span={8} key="TotalPrice">
                    <FormItem>
                        {getFieldDecorator("TotalPrice", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input placeholder="Total Price" />
                        )}
                        </FormItem>
                </Col>
                <Col span={8} key="Status">
                    <FormItem>
                        {getFieldDecorator("Status", {
                            rules: [{
                                required: false,
                                message: '',
                        }],
                        })(
                        <Input placeholder="Status" />
                        )}
                        </FormItem>
                </Col>
                </Row>
                <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">Search</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
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