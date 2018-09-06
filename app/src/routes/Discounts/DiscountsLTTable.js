import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Steps, Table, Icon, LocaleProvider } from 'antd';

const Step = Steps.Step;

import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import styles from './css/Orders.css';


export default class DiscountsLTTable extends PureComponent {
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

        const columns = [
            {
                title: 'Product Type',
                dataIndex: 'PRODUCT',
                key: 'PRODUCT',
                width: 150,
                fixed: 'left'          
            },
            {
                title: 'Sequence Number',
                dataIndex: 'SEQ_NO',
                key: 'SEQ_NO'          
            },
            {
                title: 'Promo Disc 1',
                dataIndex: 'PROMODISC1',
                key: 'PROMODISC1'          
            },
            {
                title: 'Promo Disc 2',
                dataIndex: 'PROMODISC2',
                key: 'PROMODISC2'          
            }
        ];

        console.log(data);
       
        if (data === undefined) {
            return <div>No Data ...</div>
        }

        
       
        return (
            <div>
                <LocaleProvider locale={en_US}>
                    <div style={{  width: '100%',padding:'1rem', overflowX: 'auto' }}>
                        <Table
                            size="small"
                            loading={loading}
                            dataSource={data}
                            scroll={{ x: 550 }}
                            
                            columns={columns}
                            rowKey={record => record.KUNNR}
                            pagination = {false}
                        />
                    </div>
                </LocaleProvider>
            </div>
        )


    }
}
