import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import { Dictionary } from './map/Dictionary';


export default class ViewOrderTable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    processHeaderOrder=(detail)=>{
        console.log(detail);
        let ZF00 = _.filter(detail.EX_CONDITIONS, { COND_TYP: "ZF00" });
        let ZCOD = _.filter(detail.EX_CONDITIONS, { COND_TYP: "ZCOD" });
        let JR1 = _.filter(detail.EX_CONDITIONS, { COND_TYP: "JR1" });
        

        let aHeaderItems=[
            { 
                EX_LASTCHANGE: detail.EX_LASTCHANGE, 
                EX_SHCHARGE: ZF00[0].COND_VAL,
                EX_PRODRUSH: detail.EX_PRODRUSH,
                EX_NETVAL: detail.EX_NETVAL,
                EX_ORDSTATUS: detail.EX_ORDSTATUS,
                EX_ZCOD: ZCOD[0].COND_VAL,
                EX_CSR: detail.EX_CSR, 
                EX_DOCTYP: detail.EX_DOCTYP,
                EX_JR1: JR1[0].COND_VAL
            }
        ];
        

        return aHeaderItems;

    }
    render() {
        console.log();
        console.log(this.props.data.EX_DOCTYP);
        const columns=Dictionary.requestColumns().getRequest(this.props.data.EX_DOCTYP);
        /* const columns = [{
            title: 'Item No',
            width: 120,
            dataIndex: 'ITEMNO',
            key: 'ITEMNO',
            fixed: 'left'
        },
        {
            title: 'Price',
            width: 120,
            dataIndex: 'ITEMPRICE',
            key:'ITEMPRICE',
            color: 'green',

        },
        {
            title: 'Category',
            dataIndex: 'EX_DOCTYP',
            key: 'EX_DOCTYP'
        },
        {
            title: 'Quantity',
            dataIndex: 'QUANTITY',
            key: 'QUANTITY'
        },
        {
            title: 'Material',
            dataIndex: 'MATERIAL',
            key: 'MATERIAL'
        },
        {
            title: 'Description',
            dataIndex: 'SHORT_TEXT',
            key: 'SHORT_TEXT'
        },
        {
            title: 'Plant',
            dataIndex: 'PLANT',
            key: 'PLANT'
        },
        {
            title: 'Class',
            dataIndex: 'CLASS',
            key: 'CLASS'
        },
        {
            title: 'Taxes',
            dataIndex: 'taxes',
            key: '7'
        },
        {
            title: 'Comments',
            key: 'operation',
            width: 120,
            render: () => <a href="#" > view </a>,
        },
        ]; */
        /* const columnsType = [{
            title: 'Order Type',
            width: 80,
            dataIndex: 'EX_DOCTYP',
            key: 'EX_DOCTYP'
        },
        {
            title: 'Order Status',
            width: 120,
            dataIndex: 'EX_ORDSTATUS',
            key: 'EX_ORDSTATUS',
            color: 'green',

        },
        {
            title: 'Created By',
            dataIndex: 'EX_CSR',
            key: 'EX_CSR'
        },
        {
            title: 'Last Modified By',
            dataIndex: 'EX_LASTCHANGE',
            key: 'EX_LASTCHANGE'
        },
        {
            title: 'Net Value',
            dataIndex: 'EX_NETVAL',
            key: 'EX_NETVAL'
        },
        {
            title: 'Rush Charges Cat.',
            dataIndex: 'EX_PRODRUSH',
            key: 'EX_PRODRUSH'
        },
        {
            title: 'S/H Charges',
            dataIndex: 'EX_SHCHARGE',
            key: 'EX_SHCHARGE'
        },
        {
            title: 'COD Charges',
            dataIndex: 'EX_ZCOD',
            key: 'EX_ZCOD'
        },
        {
            title: 'Taxes',
            dataIndex: 'EX_JR1',

            key: 'EX_JR1'
        },
        {
            title: 'Comments',
            key: 'operation',
            width: 120,
            render: () => <a href="#" > view </a>,
        },
        ]; */

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
        let data = [];
        let dataType;
        if (this.props.data=== undefined) {
            return <div>No Data ...</div>
        } else {
            dataType=this.processHeaderOrder(this.props.data);

            data = this.props.data.EX_ITEMS;
        }
        return (
            <div>
                {/* <div style={{padding:'12px'}}>
                <Table columns={columnsType} size="small" pagination={false} dataSource={dataType} scroll={{ x: 1500 }} />
                </div> */}
                <Table columns={columns} dataSource={data} scroll={{ x: 2350 }} />
            </div>
        )


    }
}
