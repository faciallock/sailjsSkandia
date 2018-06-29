import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZSDColumns {

    static getColumns(onBomClick, onInventoryClick) {
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
            title: 'Bracket Mount',
            dataIndex: 'BRACKETMOUNT',
            key: 'BRACKETMOUNT'
        },
        {
            title: 'LiftCord',
            dataIndex: 'LIFTCORD',
            key: 'LIFTCORD'
        },
        {
            title: 'Draw / Liner',
            dataIndex: 'DRAWLINER',
            key: 'DRAWLINER'
        },
        {
            title: 'No of panel',
            dataIndex: 'PANELS',
            key: 'PANELS'
        },
        {
            title: 'Extension Brackets',
            dataIndex: 'BRACKETS',
            key: 'BRACKETS'
        },
        {
            title: 'Specials / speciality code',
            dataIndex: 'SPECIALSONE',
            key: 'SPECIALSONE'
        },
        {
            title: 'Specials / speciality code 2',
            dataIndex: 'SPECIALSTWO',
            key: 'SPECIALSTWO'
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
                return (

                    <Button
                        onClick={() => {
                            let aData = [];
                            aData = record;
                            aData.map((item) => {
                                let currentValue = item.COND_VAL + "%";
                                item.VALUE = currentValue;
                                return item;

                            });
                            ModalInfo.show('Best Discount', aData, "l");
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        },
        {
            title: 'Price Per Line Item',
            dataIndex: 'ITEMPRICE',
            key: 'ITEMPRICE'
        },
        {
            title: 'Surcharges',
            dataIndex: 'EX_SURCHRG',
            key: 'EX_SURCHRG',
            render: (record) => {
                return (


                    <Button
                        onClick={() => {
                            const columns = [
                                {
                                    title: 'Surcharge Type',
                                    dataIndex: 'COND_TYP',
                                    key: 'COND_TYP',

                                },
                                {
                                    title: 'Description',
                                    dataIndex: 'VTEXT',
                                    key: 'VTEXT'
                                },
                                {
                                    title: 'Value',
                                    dataIndex: 'COND_VAL',
                                    key: 'COND_VAL'
                                }
                            ];

                            ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE");
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        },
        {
            title: 'BOM',
            dataIndex: 'BOM',
            key: 'BOM',
            render: (record) => {
                return (


                    <Button
                        onClick={() => {
                            console.log(record);
                            onBomClick(record.orderId, record.lineItemNumber);
                           {/*  const columns = [
                                {
                                    title: 'Surcharge Type',
                                    dataIndex: 'COND_TYP',
                                    key: 'COND_TYP',

                                },
                                {
                                    title: 'Description',
                                    dataIndex: 'VTEXT',
                                    key: 'VTEXT'
                                },
                                {
                                    title: 'Value',
                                    dataIndex: 'COND_VAL',
                                    key: 'COND_VAL'
                                }
                            ];

                            ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE"); */}
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        },
        {
            title: 'Inventory',
            dataIndex: 'INVENTORY',
            key: 'INVENTORY',
            render: (record) => {
                return (


                    <Button
                        onClick={() => {

                            onInventoryClick(record.orderId)
                            {/* const columns = [
                                {
                                    title: 'Surcharge Type',
                                    dataIndex: 'COND_TYP',
                                    key: 'COND_TYP',

                                },
                                {
                                    title: 'Description',
                                    dataIndex: 'VTEXT',
                                    key: 'VTEXT'
                                },
                                {
                                    title: 'Value',
                                    dataIndex: 'COND_VAL',
                                    key: 'COND_VAL'
                                }
                            ];

                            ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE"); */}
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        }
        ]
        
    }
}
