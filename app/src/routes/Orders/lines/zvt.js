import React, { PureComponent } from 'react';
export class zvt extends React.PureComponent {

    
    static renderLineItems=(data)=>{
        data.EX_ITEMS.map((item) => {
            let aType = ["VER"]

            let itemExConfigColor = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_COLOR` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigWidth = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_WIDTH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigLength = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_LENGTH` && itemConfig.ITEMNO === item.ITEMNO });

            let itemExConfigBracketMount = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_BRACKET_SH` && itemConfig.ITEMNO === item.ITEMNO });
            
            let itemExConfigStack = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_STACK` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigControls = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_CONTROLS` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigFreeHang = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_FREEHANG` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigExtensionBrackets = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_EXTB` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigBottomChains = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_2ON1` && itemConfig.ITEMNO === item.ITEMNO });
            

            
            let itemExCondGrossPrice = data.EX_CONDITIONS.find((itemCond) => { return itemCond.COND_TYP == `ZPR0` && itemCond.ITEMNO === parseInt(item.ITEMNO) });
//            let aDiscount=data.EX_CONDITIONS.filter((itemCond) => { return itemCond.COND_TYP === "ZBD1" || itemCond.COND_TYP === "ZBD2" || itemCond.COND_TYP === "ZBD3" || itemCond.COND_TYP === "ZBD4" })

            let aDiscount = data.EX_CONDITIONS.filter((itemCond) => { return (itemCond.COND_TYP === "ZBD1" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD2" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD3" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD4" && itemCond.ITEMNO === parseInt(item.ITEMNO)) });

          //  parseInt(item.ITEMNO)

            
            item.COLOR = itemExConfigColor ? itemExConfigColor.VALUE_CHAR : "";
            item.WIDTH = itemExConfigWidth ? itemExConfigWidth.VALUE_CHAR : "";
            item.LENGTH = itemExConfigLength ? itemExConfigLength.VALUE_CHAR: "";
            item.GROSSPRICE = itemExCondGrossPrice ? itemExCondGrossPrice.COND_VAL: "";
            item.BESTDISCOUNT = aDiscount ? aDiscount: [];

            item.BRACKET_SH = itemExConfigBracketMount ?  itemExConfigBracketMount.VALUE_DESC: "";
                     
            item.STACK = itemExConfigStack   ? itemExConfigStack.VALUE_DESC : "";
            item.CONTROLS = itemExConfigControls ? itemExConfigControls.VALUE_DESC : "";
            item.FREEHANG = itemExConfigFreeHang ? itemExConfigFreeHang.VALUE_DESC : "";
            item.EXTB = itemExConfigExtensionBrackets ? itemExConfigExtensionBrackets.VALUE_DESC : "";
            item.TWOONONE = itemExConfigBottomChains ? itemExConfigBottomChains.VALUE_DESC : "";


            item.BOM = {
                orderId: data.IM_SALESDOCU, lineItemNumber: item.ITEMNO}
            item.INVENTORY = { orderId: data.IM_SALESDOCU};
            

            var aMaterialColor = item.MATERIAL ? item.MATERIAL.split("-"): [item.MATERIAL, ""];
            item.COLOR = aMaterialColor[1];
            item.MATERIAL = aMaterialColor[0];
            //ZEA_COLOR
            //ZEA_BRACKET_SH
            return item;

        });
        return data.EX_ITEMS;
    }
}

