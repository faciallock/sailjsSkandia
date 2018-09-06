import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Table, LocaleProvider, Row, Col } from 'antd';

import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';


export default class DiscountCustomerDetails extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    render() {

        console.log(this.props.data);
        let customerData;

        if (this.props.data.LS_CUST_DET === undefined) {
            return <div>No Data ...</div>
        }
        else{
            customerData =this.props.data.LS_CUST_DET;
        }
       
        return (
            <div>
                <LocaleProvider locale={en_US}>
                    
                   
                    <Row gutter={12}>
                        <Col lg={8} md={12} sm={24}>
                            <span><b>Customer:</b> {customerData.NAME1} </span>
                        </Col>
                        <Col lg={8} md={12} sm={24}>
                            <span><b>Salesman:</b> {customerData.SALEMAN}</span>
                        </Col>
                        <Col lg={8} md={12} sm={24}>
                            <span><b>Contact:</b> {customerData.CONT_NAME}</span>
                        </Col>
                        <Col lg={8} md={12} sm={24}>
                            <span><b>Address:</b> {customerData.STREET2}</span>
                        </Col>
                        <Col lg={8} md={12} sm={24}>
                            <span><b>Qtr Profit:</b> {customerData.QTR_PROFIT}</span>
                        </Col>
                        <Col lg={8} md={12} sm={24}>
                        </Col>
                    </Row>
                </LocaleProvider>
            </div>
        )


    }
}
