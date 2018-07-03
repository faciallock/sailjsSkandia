import React, { PureComponent } from 'react';
export class zsh extends React.PureComponent {

    
    static renderLineItems=(data)=>{
        data.EX_ITEMS.map((item) => {
            let aType = item.CLASS.split('_')

            let itemExConfigColor = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_COLOR` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigWidth = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_WIDTH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigLength = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_LENGTH` && itemConfig.ITEMNO === item.ITEMNO });

            let itemExConfigFrame = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_FRAME` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigArch = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_ARCH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigLouerSize = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_LOUVER_SIZE` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigHinges = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_HINGES` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigMount = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_BRACKET_SH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigPreDrill = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_SHUT_PRE_MAGNET_DRILL` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigClearView = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_CLEAR_VIEW` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigSquareFeet = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_PRICE_VINYL` && itemConfig.ITEMNO === item.ITEMNO });
            
            let itemExCondGrossPrice = data.EX_CONDITIONS.find((itemCond) => { return itemCond.COND_TYP == `ZPR0` && itemCond.ITEMNO === parseInt(item.ITEMNO) });
            //let aDiscount=data.EX_CONDITIONS.filter((itemCond) => { return itemCond.COND_TYP === "ZBD1" || itemCond.COND_TYP === "ZBD2" || itemCond.COND_TYP === "ZBD3" || itemCond.COND_TYP === "ZBD4" })
            let aDiscount = data.EX_CONDITIONS.filter((itemCond) => { return (itemCond.COND_TYP === "ZBD1" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD2" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD3" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD4" && itemCond.ITEMNO === parseInt(item.ITEMNO)) });
            let itemExSurchrg = data.EX_SURCHRG.filter((itemSurchrg) => { return itemSurchrg.ITEMNO === parseInt(item.ITEMNO) });
          //  parseInt(item.ITEMNO)

            
            item.COLOR = itemExConfigColor ? itemExConfigColor.VALUE_DESC : "";
            item.WIDTH = itemExConfigWidth ? itemExConfigWidth.VALUE_CHAR : "";
            item.LENGTH = itemExConfigLength ? itemExConfigLength.VALUE_CHAR: "";
            item.GROSSPRICE = itemExCondGrossPrice ? itemExCondGrossPrice.COND_VAL: "";
            item.BESTDISCOUNT = aDiscount ? aDiscount: [];

            item.FRAME = itemExConfigFrame ? itemExConfigFrame.VALUE_DESC : "";
            item.ARCH = itemExConfigArch ? itemExConfigArch.VALUE_DESC : "";
            item.LOUVER_SIZE = itemExConfigLouerSize ? itemExConfigLouerSize.VALUE_DESC : "";
            item.HINGES = itemExConfigHinges ? itemExConfigHinges.VALUE_DESC : "";
            item.BRACKET_SH = itemExConfigMount ? itemExConfigMount.VALUE_DESC : "";
            item.PRE_MAGNET_DRILL = itemExConfigPreDrill ? itemExConfigPreDrill.VALUE_DESC : "";
            item.CLEAR_VIEW = itemExConfigClearView ? itemExConfigClearView.VALUE_DESC : "";
            item.PRICE_VINYL = itemExConfigSquareFeet ? itemExConfigSquareFeet.VALUE_CHAR : "";
            item.EX_SURCHRG = itemExSurchrg;
            item.BOM = {
                orderId: data.IM_SALESDOCU, lineItemNumber: item.ITEMNO
            }
            item.INVENTORY = { orderId: data.IM_SALESDOCU };
            
            
            //ZEA_COLOR
            //ZEA_BRACKET_SH
            return item;

        });
        return data.EX_ITEMS;
    }
}

