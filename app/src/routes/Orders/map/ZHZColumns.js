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
            title: 'Qty',
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
            title: 'Mount',
            dataIndex: 'BRACKET_SH',
            key: 'BRACKET_SH',
            render: (record) => {
                let bracketMountFormatted=record === "Inside Mount" ? "IB":"OB";
                return (
                    <span>{ bracketMountFormatted }</span>
                )
            }
        },
        {
            title: 'Tilter',
            dataIndex: 'TILTER',
            key: 'TILTER',
            render: (record) => {
                console.log(record)
                let tilterFormatted="";
                switch (record) {
                    case "Wand Tilt - Left":
                        tilterFormatted="Wand - L";
                        break;
                    case "Wand Tilt - Right":
                        tilterFormatted="Wand - R";
                        break;
                    case "Cord Tilt - Left":
                        tilterFormatted="Cord - L";
                        break;
                    case "Cord Tilt - Right":
                        tilterFormatted="Cord - R";
                        break;
                    default:
                        break;
                }
                return (
                    <span>{ tilterFormatted }</span>
                )
            }
        },
        {
            title: 'Lift Cord',
            dataIndex: 'CORDS',
            key: 'CORDS'
        },
        {
            title: 'Ext Brackets',
            dataIndex: 'EXTB',
            key: 'EXTB'
        },
        {
            title: '2 on 1, 3 on 1',
            dataIndex: 'TWOONONE',
            key: 'TWOONONE'
        },
        {
            title: 'Ladder/Tape',
            dataIndex: 'LADDER_TAPE',
            key: 'LADDER_TAPE'
        },
        {
            title: 'Retail Price',
            dataIndex: 'GROSSPRICE',
            key: 'GROSSPRICE',
            render: (record) => {
                let currentGrossprice=record!=="" ? "$"+parseFloat(record).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "";
                return (
                    <span>{ currentGrossprice }</span>
                )
            }
        },
        {
            title: 'Discount',
            dataIndex: 'BESTDISCOUNT',
            width: 160,
            key: 'BESTDISCOUNT',
            render: (record) => {
                console.log(record);
                let currentDiscount="";

                record.map((item) => {
                    let currentNumber= parseFloat(Math.round(item.COND_VAL * 100)/ 100).toFixed(0);
                    console.log("cond_val"+item.COND_VAL)
                   // let currentValue = currentNumber + "%";
                    currentDiscount= currentDiscount+currentNumber+"/";
                    console.log({currentDiscount})
                    item.VALUE = currentDiscount;
                    return item;

                });
                return (
                    
                    

                    <span>{ currentDiscount.substring(0, currentDiscount.length - 1)}</span>
                )
            }
        },
        {
            title: 'Price Per Line Item',
            dataIndex: 'ITEMPRICE',
            key: 'ITEMPRICE',
            render: (record) => {
                let currentLineItem= record!=="" ? "$"+parseFloat(record).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "";
                return (
                    <span>{ currentLineItem }</span>
                )
            }
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
