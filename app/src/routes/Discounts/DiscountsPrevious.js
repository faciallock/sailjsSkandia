import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Steps, Divider, Row, Col, LocaleProvider } from 'antd';

const Step = Steps.Step;

import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import styles from './css/Orders.css';


export default class DiscountsPrevious extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    render() {

        //let salesMarginData;

        const { data,loading } = this.props;

        

        
       
        if (data === undefined) {
            return <div></div>
        }

        
       
        return (
            <div>
                <LocaleProvider locale={en_US}>
                    <div style={{  width: '100%',padding:'1rem', overflowX: 'auto',textAlign:'center' }}>

                        <Row gutter={12}>
                            <Col lg={8} md={8} sm={24}>
                                <b>Previous Vendor:</b> {data.PREV_VENDOR}
                            </Col>
                            <Col lg={8} md={8} sm={24}>
                                <b>Prior Mo Sale / %:</b> {data.SK_PRIOR_MO}
                            </Col>
                            <Col lg={8} md={8} sm={24}>
                            <b>Expected Volume: </b> {data.EXPT_VOL}
                            </Col>
                        </Row>
                        
                          
                        {/* <Table
                            size="small"
                            loading={loading}
                            dataSource={data}
                            
                            columns={columns}
                            rowKey={record => record.KUNNR}
                            pagination = {false}
                        /> */}
                    </div>
                </LocaleProvider>
            </div>
        )


    }
}
