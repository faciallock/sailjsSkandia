import React, { PureComponent } from 'react';
export class zms extends React.PureComponent {

    
    static renderLineItems=(data)=>{
        data.EX_ITEMS.map((item) => {
            let aType = ["ORDD"];
            let itemExConfigWidth = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_WIDTH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigLength = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_LENGTH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExCondColor = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_COLOR` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExCondGrossPrice = data.EX_CONDITIONS.find((itemCond) => { return itemCond.COND_TYP == `ZPR0` && itemCond.ITEMNO === parseInt(item.ITEMNO) });
            let aDiscount=data.EX_CONDITIONS.filter((itemCond) => { return itemCond.COND_TYP === "ZBD1" || itemCond.COND_TYP === "ZBD2" || itemCond.COND_TYP === "ZBD3" || itemCond.COND_TYP === "ZBD4" })

          //  parseInt(item.ITEMNO)

            

            item.WIDTH = itemExConfigWidth ? itemExConfigWidth.VALUE_CHAR: "";
            item.LENGTH = itemExConfigLength ? itemExConfigLength.VALUE_CHAR : "";
            item.GROSSPRICE = itemExCondGrossPrice ? itemExCondGrossPrice.COND_VAL : "";
            item.BESTDISCOUNT = aDiscount ? aDiscount: [];
            item.COLOR = itemExCondColor ? itemExCondColor.CHAR_DESC : "";
            
            
            //ZEA_COLOR
            //ZEA_BRACKET_SH
            return item;

        });
        return data.EX_ITEMS;
    }
}

