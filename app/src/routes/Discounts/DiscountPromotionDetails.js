import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Table, LocaleProvider, Row, Col } from 'antd';

import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import moment from 'moment';

export default class DiscountPromotionDetails extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }

    formatDate=(date)=>{
        let dateJS = new Date(parseInt(date.substring(0, 4)), parseInt(date.substring(4, 6))-1, parseInt(date.substring(6, 8)))  //date+time;
                   // console.log(dateJS)
                    return moment(dateJS).format("MM/DD/YYYY");
                    

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
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Promo#:</b> {customerData.PROMO} </span>
                                
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Promo Start Date:</b> {this.formatDate(customerData.PROMO_START)   }</span>
                                
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Promo End Date:</b> {this.formatDate(customerData.PROMO_END)}</span>
                            
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Status:</b> {customerData.STATUS_TEXT}</span>
                                
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Budget Code:</b> {customerData.BUD_CODE_TXT}</span>
                                
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Business Location:</b> {customerData.BUSS_LOC_TXT}</span>
                            
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Window Covering Business:</b> {customerData.WIN_COV_BUS_TXT}</span>
                                
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Business Type:</b> {customerData.BUSS_TYPE_TXT} </span>
                                
                            </Col>
                            <Col lg={8} md={12} sm={12} xs={24}>
                                <span><b>Web Referal:</b>{customerData.WEB_RFE_TXT}</span>
                            
                            </Col>
                        </Row>
                        
                    </div>
                </LocaleProvider>
            </div>
        )


    }
}
