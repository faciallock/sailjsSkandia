import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZVTColumns {

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
            dataIndex: 'COLOR',
            key: 'COLOR'
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
            title: 'Bracket Mount',
            dataIndex: 'BRACKET_SH',
            key: 'BRACKET_SH'
        },
        {
            title: 'Stack',
            dataIndex: 'STACK',
            key: 'STACK'
        },
        {
            title: 'Controls',
            dataIndex: 'CONTROLS',
            key: 'CONTROLS'
        },
        {
            title: 'Free Hang',
            dataIndex: 'FREEHANG',
            key: 'FREEHANG'
        },
        {
            title: 'Extension Brackets',
            dataIndex: 'EXTB',
            key: 'EXTB'
        },
        {
            title: 'Bottom Chains',
            dataIndex: 'TWOONONE',
            key: 'TWOONONE'
        },
        {
            title: 'Gross price',
            dataIndex: 'GROSSPRICE',
            key: 'GROSSPRICE'
        },
        {
            title: 'Best Discount',
            dataIndex: 'taxes',
            key: '7'
        },
        {
            title: 'Price Per Line Item',
            dataIndex: 'taxes',
            key: '7'
        },
        {
            title: 'Surcharges',
            dataIndex: 'taxes',
            key: '7'
        },
        {
            title: 'BOM',
            dataIndex: 'taxes',
            key: '7'
        },
        {
            title: 'Inventory',
            dataIndex: 'taxes',
            key: '7'
        }
        ]
        
    }
}
