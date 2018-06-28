import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZSHColumns {

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
            title: 'Frame',
            dataIndex: 'FRAME',
            key: 'FRAME'
        },
        {
            title: 'Arch',
            dataIndex: 'ARCH',
            key: 'ARCH'
        },
        {
            title: 'Louer Size',
            dataIndex: 'LOUVER_SIZE',
            key: 'LOUVER_SIZE'
        },
        {
            title: 'Hinges',
            dataIndex: 'HINGES',
            key: 'HINGES'
        },
        {
            title: 'Mount',
            dataIndex: 'BRACKET_SH',
            key: 'BRACKET_SH'
        },
        {
            title: 'Pre Drill Code',
            dataIndex: 'PRE_MAGNET_DRILL',
            key: 'PRE_MAGNET_DRILL'
        },
        {
            title: 'Clear View Option',
            dataIndex: 'CLEAR_VIEW',
            key: 'CLEAR_VIEW'
        },
        {
            title: 'Square Feet',
            dataIndex: 'PRICE_VINYL',
            key: 'PRICE_VINYL'
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
        }]
        
    }
}
