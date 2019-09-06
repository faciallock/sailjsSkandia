import React, { PureComponent, Fragment } from 'react';
import _ from 'lodash';
import { Table, LocaleProvider, Button, Input, message, Popconfirm, Divider } from 'antd';
import { Dictionary } from './map/Dictionary';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {zsd}  from './lines/zsd';
import { zms } from './lines/zms';
import { zsh } from './lines/zsh';
import { zhz } from './lines/zhz';
import { zvt } from './lines/zvt';


export default class ViewOrderTable extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.value,
            loading: false,
        };
    }
    renderData = (data,type) => {
        
        switch (type) {
            case "ZSD":
                return zsd.renderLineItems(data);
                break;
            case "ZMS":
                return zms.renderLineItems(data);
                break;
            case "ZSH":
                return zsh.renderLineItems(data);
                break;

            case "ZHZ":
                return zhz.renderLineItems(data);
                break;

            case "ZVT":
                return zvt.renderLineItems(data);
                break;
            default:
                return data.EX_ITEMS;
                break;
        }
        
        

    }
    processHeaderOrder = (detail) => {
        console.log(detail);
        let ZF00 = _.filter(detail.EX_CONDITIONS, { COND_TYP: "ZF00" });
        let ZCOD = _.filter(detail.EX_CONDITIONS, { COND_TYP: "ZCOD" });
        let JR1 = _.filter(detail.EX_CONDITIONS, { COND_TYP: "JR1" });
        

        let aHeaderItems=[
            { 
                EX_LASTCHANGE: detail.EX_LASTCHANGE, 
                EX_SHCHARGE: (typeof ZF00[0] === 'undefined') ? "" : ZF00[0].COND_VAL,
                EX_PRODRUSH: detail.EX_PRODRUSH,
                EX_NETVAL: detail.EX_NETVAL,
                EX_ORDSTATUS: detail.EX_ORDSTATUS,
                EX_ZCOD: (typeof ZCOD[0] === 'undefined') ? "" : ZCOD[0].COND_VAL,
                EX_CSR: detail.EX_CSR, 
                EX_DOCTYP: detail.EX_DOCTYP,
                EX_JR1: (typeof JR1[0] === 'undefined') ? "" : JR1[0].COND_VAL
            }
        ];
        

        return aHeaderItems;

    }
    render() {
        console.log();
        console.log(this.props.data.EX_DOCTYP);
        const columns = Dictionary.requestColumns(this.props.onSurchargesClick, this.props.onBestDiscountClick, this.props.onBomClick, this.props.onInventoryClick).getRequest(this.props.data.EX_DOCTYP);
        let data = [];
        //let dataType;
        if (this.props.data=== undefined) {
            return <div>No Data ...</div>
        } else {
            //dataType=this.processHeaderOrder(this.props.data);

            

            data = this.renderData(this.props.data, this.props.data.EX_DOCTYP); ;
            //console.log(data);
            
        }
        return (
            <div>
                {/* <div style={{padding:'12px'}}>
                <Table columns={columnsType} size="small" pagination={false} dataSource={dataType} scroll={{ x: 1500 }} />
                </div> */}
                <LocaleProvider locale={en_US}>
                    <Table 
                    columns={columns}
                    locale={{ emptyText: 'No Data' }} 
                    dataSource={data}
                    scroll={{ x: 2500 }}
                        // rowKey={record => record.ITEMNO} 
                        
                        />
                </LocaleProvider>
            </div>
        )


    }
}
