import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZHZColumns {

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
            title: 'Tilter',
            dataIndex: 'TILTER',
            key: 'TILTER'
        },
        {
            title: 'Lift Cord',
            dataIndex: 'CORDS',
            key: 'CORDS'
        },
        {
            title: 'Extension Brackets',
            dataIndex: 'EXTB',
            key: 'EXTB'
        },
        {
            title: '2 or 3 on 1 Headrail',
            dataIndex: 'TWOONONE',
            key: 'TWOONONE'
        },
        {
            title: 'Ladder/Tape',
            dataIndex: 'LADDER_TAPE',
            key: 'LADDER_TAPE'
        },
        {
            title: 'CutDown Item#',
            dataIndex: 'CUT',
            key: 'CUT'
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
        }]
        
    }
}
