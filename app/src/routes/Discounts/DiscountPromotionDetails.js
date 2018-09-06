import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Table, LocaleProvider, Row, Col } from 'antd';

import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';


export default class DiscountPromotionDetails extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    render() {
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
                    <div>
                        
                        <Row>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Promo#:</b> {customerData.PROMO} </span>
                                
                            </Col>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Promo Start Date:</b> {customerData.PROMO_START}</span>
                                
                            </Col>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Promo End Date:</b> {customerData.PROMO_END}</span>
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Status:</b> {customerData.STATUS_TEXT}</span>
                                
                            </Col>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Budget Code:</b> {customerData.BUD_CODE_TXT}</span>
                                
                            </Col>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Business Location:</b> {customerData.BUSS_LOC_TXT}</span>
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Window Covering Business:</b> {customerData.WIN_COV_BUS_TXT}</span>
                                
                            </Col>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Business Type:</b> {customerData.BUSS_TYPE_TXT} </span>
                                
                            </Col>
                            <Col lg={8} md={24} sm={24}>
                                <span><b>Web Referal:</b>{customerData.WEB_RFE_TXT}</span>
                            
                            </Col>
                        </Row>
                    </div>
                </LocaleProvider>
            </div>
        )


    }
}
