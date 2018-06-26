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
                    dataIndex: 'WIDTH',
                    key: 'WIDTH'
                },
                {
                    title: 'Length',
                    dataIndex: 'LENGTH',
                    key: 'LENGTH'
                },
                {
                    title: 'BracketMount',
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
                    key: 'BESTDISCOUNT'
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
