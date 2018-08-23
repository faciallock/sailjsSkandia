import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZSHColumns {

    static getColumns(onSurchargesClick, onBestDiscountClick,onBomClick, onInventoryClick){
        var aColumns =  [{
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
            key: 'QUANTITY',
            render: (record) => {
                return (
                    <span>{ parseInt(record) }</span>
                )
            }
        },
        {
            title: 'Width',
            dataIndex: 'WIDTH',
            key: 'WIDTH',
            render: (record) => {
                return (
                    <span>{ parseFloat(record).toFixed(2) }</span>
                )
            }
        
        },
        {
            title: 'Length',
            dataIndex: 'LENGTH',
            key: 'LENGTH',
            render: (record) => {
                return (
                    <span>{ parseFloat(record).toFixed(2) }</span>
                )
            }
        },
        
        {
            title: 'Plant',
            dataIndex: 'PLANT',
            key: 'PLANT',
            render: (record) => {
                let plantDesc="";
                switch (record) {
                    case '1110':
                        plantDesc="TLH";
                        break;
                    case '1115':
                        plantDesc="TVL";
                        break;
                    case '1410':
                        plantDesc="SD";
                        break;
                
                    default:
                        break;
                }
                return (
                    <span>{ plantDesc }</span>
                )
            }
        },
       
        {
            title: 'Frame',
            dataIndex: 'FRAME',
            key: 'FRAME'
        },
        {
            title: 'Arch',
            dataIndex: 'ARCH',
            key: 'ARCH',
            render: (record) => {
                let archFormatted=record === "" ? "N/A":"";
                return (
                    <span>{ archFormatted }</span>
                )
            }
            
        },
        {
            title: 'Lovuer Size',
            dataIndex: 'LOUVER_SIZE',
            key: 'LOUVER_SIZE'
        },
        {
            title: 'Hinges',
            dataIndex: 'HINGES',
            key: 'HINGES'
        },
        {
            title: 'Bracket Mount',
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
       /*  {
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
        }, */
        {
            title: 'Price Per Line Item',
            dataIndex: 'ITEMPRICE',
            key: 'ITEMPRICE',
            render: (record) => {
                let currentLineItem=record!=="" ? "$"+parseFloat(record).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "";
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
                                /* const columns = [
                                    {
                                        title: 'Selected',
                                        dataIndex: 'MARK',
                                        key: 'MARK',

                                    },
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

                                ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE"); */
                                onSurchargesClick(record);
                            }}
                            type="default" icon="eye-o">View</Button>
                    )
                }
            }];

            if ( localStorage.getItem('userType') != "D"){
            
            
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
