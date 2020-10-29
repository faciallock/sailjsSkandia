import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Button } from 'antd';
import { ModalInfo } from '../components/ModalInfo';
export class ZSDColumns {

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
            key: 'QUANTITY',
            render: (record) => {
                return (
                    <span>{parseInt(record)}</span>
                )
            }
        },
        {
            title: 'Width',
            dataIndex: 'WIDTH',
            key: 'WIDTH',
            render: (record) => {
                return (
                    <span>{record === "" ? "" : parseFloat(record).toFixed(2)}</span>
                )
            }
        },
        {
            title: 'Length',
            dataIndex: 'LENGTH',
            key: 'LENGTH',
            render: (record) => {
                return (
                    <span>{record === "" ? "" : parseFloat(record).toFixed(2)}</span>
                )
            }
        },
        {
            title: 'Bracket Mount',
            dataIndex: 'BRACKET_SH',
            key: 'BRACKET_SH',
            render: (record) => {
                let bracketMountFormatted = record === "Inside Mount" ? "IB" : "OB";
                return (
                    <span>{bracketMountFormatted}</span>
                )
            }
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
            title: 'Retail Price',
            dataIndex: 'GROSSPRICE',
            key: 'GROSSPRICE',
            render: (record) => {
                let currentGrossprice = record !== "" ? "$" + parseFloat(record).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "";
                return (
                    <span>{currentGrossprice}</span>
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
                let currentDiscount = "";

                record.map((item) => {
                    let currentNumber = parseFloat(Math.round(item.COND_VAL * 100) / 100).toFixed(0);
                    console.log("cond_val" + item.COND_VAL)
                    // let currentValue = currentNumber + "%";
                    currentDiscount = currentDiscount + currentNumber + "/";
                    console.log({ currentDiscount })
                    item.VALUE = currentDiscount;
                    return item;

                });
                return (



                    <span>{currentDiscount.substring(0, currentDiscount.length - 1)}</span>
                )
            }
        },
        {
            title: 'Price Per Line Item',
            dataIndex: 'ITEMPRICE',
            key: 'ITEMPRICE',
            render: (record) => {
                let currentLineItem = record !== "" ? "$" + parseFloat(record).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "";
                return (
                    <span>{currentLineItem}</span>
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
                            {/* const columns = [
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

                            ModalInfo.show('Surchages Details', record, "t", columns, "COND_TYPE"); */}
                            onSurchargesClick(record);
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        }];

        // if ( localStorage.getItem('userType') != "D"){
        // aColumns.push({
        //     title: 'BOM',
        //     dataIndex: 'BOM',
        //     key: 'BOM',
        //     render: (record) => {
        //         return (


        //             <Button
        //                 onClick={() => {
        //                     console.log(record);
        //                     onBomClick(record.orderId, record.lineItemNumber);
        //                     // { }
        //                 }}
        //                 type="default" icon="eye-o">View</Button>
        //         )
        //     }
        // });

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
                        type="default" icon="eye-o"> View</Button>
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
                            { }
                        }}
                        type="default" icon="eye-o">View</Button>
                )
            }
        });
        //   }

        return aColumns;

    }
}
