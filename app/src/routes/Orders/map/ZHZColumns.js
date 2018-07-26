import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZHZColumns {

    static getColumns(onSurchargesClick, onBestDiscountClick, onBomClick, onInventoryClick) {
        
        
        
        
        var aColumns = [{
            title: 'Line',
            width: 80,
            dataIndex: 'ITEMNO',
            key: 'ITEMNO',
            fixed: 'left',
            render: (text, record) => {
                    
                let value = text.replace(/^0+/, '');
                return (
                    <span>{value}</span> 
                )
            } 

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
            dataIndex: 'MSC_ITEM',
            key: 'MSC_ITEM'
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
                                let currentNumber= parseFloat(Math.round(item.COND_VAL * 100)/ 100).toFixed(2)
                                let currentValue = currentNumber + "%";
                                item.VALUE = currentValue;
                                return item;

                            });

                            onBestDiscountClick(aData);
                            //ModalInfo.show('Best Discount', aData, "l");
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

                               // ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE");
                                onSurchargesClick(record);
                            }}
                            type="default" icon="eye-o">View</Button>
                    )
                }
            }];

            
            if ( localStorage.getItem('userType') == "D"){

                aColumns = aColumns.splice(13, 1);

            }else{

                aColumns.push({
                    title: 'BOM',
                    dataIndex: 'BOM',
                    key: 'BOM',
                    render: (record) => {
                        return (
    
    
                            <Button
                                onClick={() => {
                                    console.log(record);
                                    onBomClick(record.orderId, record.lineItemNumber);
                                }}
                                type="default" icon="eye-o">View</Button>
                        )
                    }
                });
                aColumns.push({
                    title: 'Inventory',
                    dataIndex: 'INVENTORY',
                    key: 'INVENTORY',
                    render: (record) => {
                        return (
    
    
                            <Button
                                onClick={() => {
    
                                    onInventoryClick(record.orderId)
                                }}
                                type="default" icon="eye-o">View</Button>
                        )
                    }
                });

            }

            return aColumns;

            
            
            
        
    }
}
