import React, { PureComponent, Fragment } from 'react';
export class Dictionary {
    
    static requestColumns(){
        return {
            ZSD: [{
                    title: 'Line',
                    width: 80,
                    dataIndex: 'ITEMNO',
                    key: 'ITEMNO',
                    fixed: 'left'
                },
                {
                    title: 'Product',
                    dataIndex: 'ITEMPRICE',
                    key: 'ITEMPRICE',
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
                    dataIndex: 'MATERIAL',
                    key: 'MATERIAL'
                },
                {
                    title: 'Length',
                    dataIndex: 'SHORT_TEXT',
                    key: 'SHORT_TEXT'
                },
                {
                    title: 'BracketMount',
                    dataIndex: 'PLANT',
                    key: 'PLANT'
                },
                {
                    title: 'LiftCord',
                    dataIndex: 'CLASS',
                    key: 'CLASS'
                },
                {
                    title: 'Draw / Liner',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'No of panel',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Extension Brackets',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Specials / speciality code',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Specials / speciality code 2',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Gross price',
                    dataIndex: 'taxes',
                    key: '7'
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
            ],
            ZSH: [{
                    title: 'Line',
                    width: 80,
                    dataIndex: 'ITEMNO',
                    key: 'ITEMNO',
                    fixed: 'left'
                },
                {
                    title: 'Product',
                    dataIndex: 'ITEMPRICE',
                    key: 'ITEMPRICE',
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
                    dataIndex: 'MATERIAL',
                    key: 'MATERIAL'
                },
                {
                    title: 'Length',
                    dataIndex: 'SHORT_TEXT',
                    key: 'SHORT_TEXT'
                },
                {
                    title: 'Frame',
                    dataIndex: 'PLANT',
                    key: 'PLANT'
                },
                {
                    title: 'Arch',
                    dataIndex: 'CLASS',
                    key: 'CLASS'
                },
                {
                    title: 'Louer Size',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Hinges',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Mount',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Pre Drill Code',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Clear View Option',
                    dataIndex: 'taxes',
                    key: '7'
                },
                {
                    title: 'Square Feet',
                    dataIndex: 'taxes',
                    key: '7'
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
                }],
            HorizontalBlinds: [],
            VerticalBlinds: [],
            Miscellaneous: [],
            getRequest: function(aColumn) {
                var value = eval("this." + aColumn);
                return value;
            }
        }
    }
}
