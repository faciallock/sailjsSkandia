import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZMSColumns {

    static getColumns() {
        return [{
            title: 'Line',
            width: 80,
            dataIndex: 'ITEMNO',
            key: 'ITEMNO',
            fixed: 'left'
        },
        {
            title: 'Product',
            dataIndex: 'MATERIAL',
            key: 'MATERIAL',
            color: 'green',

        },
        {
            title: 'Color',
            dataIndex: 'EX_DOCTYP',
            key: 'EX_DOCTYP'
        },
        {
            title: 'Quantity',
            dataIndex: 'QUANTITY',
            key: 'QUANTITY'
        },
        {
            title: 'Width',
            dataIndex: 'WIDTH',
            key: 'WIDTH'
        },
        {
            title: 'Length',
            dataIndex: 'LENGTH',
            key: 'LENGTH'
        },
        {
            title: 'Plant',
            dataIndex: 'PLANT',
            key: 'PLANT'
        },
        {
            title: 'Gross price',
            dataIndex: 'GROSSPRICE',
            key: 'GROSSPRICE'
        },
        {
            title: 'Best Discount',
            dataIndex: 'BESTDISCOUNT',
            key: 'BESTDISCOUNT',
            render: (record) => {
                console.log(record);

                return (
                    <div>
                        {record.map((item) => {
                            <span>{item.COND_VAL} %
                            </span>
                        })}
                    </div>
                )
            }
        },
        {
            title: 'Price Per Line Item',
            dataIndex: 'PRICEPERLINE',
            key: 'PRICEPERLINE'
        },
        {
            title: 'Surcharges',
            dataIndex: 'SURCHARGES',
            key: 'SURCHARGES'
        },
        {
            title: 'BOM',
            dataIndex: 'BOM',
            key: 'BOM'
        },
        {
            title: 'Inventory',
            dataIndex: 'INVENTORY',
            key: 'INVENTORY'
        }]
        
    }
}
