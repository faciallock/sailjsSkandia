import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import styles from './style.less';
import { div } from 'gl-matrix/src/gl-matrix/vec3';

export default class ViewOrderTable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    render() {
        console.log(this.props.data);
        const columns = [{
            title: 'Orders Type',
            width: 120,
            dataIndex: 'orderType',
            key: 'orderType',
            fixed: 'left'
        },
        {
            title: 'Order Status',
            width: 120,
            dataIndex: 'orderStatus',
            color: 'green',
            fixed: 'left'

        },
        {
            title: 'Created By',
            dataIndex: 'createdby',
            key: '1'
        },
        {
            title: 'Last Modified By',
            dataIndex: 'lastModifiedBy',
            key: '2'
        },
        {
            title: 'Net Value',
            dataIndex: 'netValue',
            key: '3'
        },
        {
            title: 'Rush Charges Cat.',
            dataIndex: 'rushChargesCat',
            key: '4'
        },
        {
            title: 'S/H Charges',
            dataIndex: 'shCharges',
            key: '5'
        },
        {
            title: 'COD Charges',
            dataIndex: 'codCharges',
            key: '6'
        },
        {
            title: 'Taxes',
            dataIndex: 'taxes',
            key: '7'
        },
        {
            title: 'Comments',
            key: 'operation',
            fixed: 'right',
            width: 120,
            render: () => <a href="#" > view </a>,
        },
        ];

        /* const data = [{
            key: '1',
            name: 'Shades',
            age: 'Confirmed',
            address: 'AMURUGESAN',
            lastModifiedBy: 'AMURUGESAN',
            netValue: '$570.23',
            rushChargesCat: "Regular",
            shCharges: "29.73",
            codCharges: "0.0",
            taxes: "0.0"

        }]; */
        let data=[];
        if (this.props.data.length === 0) {
            return <div>No Data ...</div>
        }else{
            data = this.props.data;
        }
        return (
            

            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
        )


    }
}
