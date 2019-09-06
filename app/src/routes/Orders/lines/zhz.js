import React, { PureComponent } from 'react';
export class zhz extends React.PureComponent {

    
    static renderLineItems=(data)=>{
        data.EX_ITEMS.map((item,index) => {
            let aType = ["HZB"]

            let itemExConfigColor = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_COLOR` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfigWidth = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_WIDTH` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfigLength = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_LENGTH` && parseInt(itemConfig.ITEMNO) === (index + 1) });

            let itemExConfigBracketMount = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_BRACKET_SH` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfigBracketTilter = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_TILTER` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfigBracketLiftCords = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_CORDS` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfigExtensionBrackets = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_EXTB` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfig2or3 = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_2ON1` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfigLadder = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_LADDER_TAPE` && parseInt(itemConfig.ITEMNO) === (index + 1) });
            let itemExConfigCutDownItem = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_CUT` && parseInt(itemConfig.ITEMNO) === (index + 1) });

            
            let itemExCondGrossPrice = data.EX_CONDITIONS.find((itemCond) => { return itemCond.COND_TYP == `ZPR0` && itemCond.ITEMNO === parseInt(item.ITEMNO) });
            //let aDiscount = data.EX_CONDITIONS.filter((itemCond) => { return itemCond.COND_TYP === "ZBD1" || itemCond.COND_TYP === "ZBD2" || itemCond.COND_TYP === "ZBD3" || itemCond.COND_TYP === "ZBD4" && itemCond.ITEMNO === parseInt(item.ITEMNO)  });
            let itemExSurchrg = data.EX_SURCHRG.filter((itemSurchrg) => { return itemSurchrg.ITEMNO === parseInt(item.ITEMNO) });
            let aDiscount =data.EX_CONDITIONS.filter((itemCond) => { return (itemCond.COND_TYP === "ZBD1" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD2" && itemCond.ITEMNO === parseInt(item.ITEMNO))  });

          //  parseInt(item.ITEMNO)

            
            item.COLOR = itemExConfigColor ? itemExConfigColor.VALUE_CHAR : ""; 
            item.WIDTH = itemExConfigWidth ? itemExConfigWidth.VALUE_CHAR : ""; 
            item.LENGTH = itemExConfigLength ? itemExConfigLength.VALUE_CHAR: ""; 
            item.GROSSPRICE = itemExCondGrossPrice ? itemExCondGrossPrice.COND_VAL: ""; 
            item.BESTDISCOUNT = aDiscount ? aDiscount: []; 

            item.BRACKET_SH = itemExConfigBracketMount ?  itemExConfigBracketMount.VALUE_DESC: ""; 
            item.TILTER = itemExConfigBracketTilter ?  itemExConfigBracketTilter.VALUE_DESC: ""; 
            item.CORDS = itemExConfigBracketLiftCords ?  itemExConfigBracketLiftCords.VALUE_DESC: ""; 
            item.EXTB = itemExConfigExtensionBrackets ?  itemExConfigExtensionBrackets.VALUE_DESC: ""; 
            item.TWOONONE = itemExConfig2or3 ?  itemExConfig2or3.VALUE_DESC: ""; 
            item.LADDER_TAPE = itemExConfigLadder ?  itemExConfigLadder.VALUE_DESC: ""; 
            item.CUT = itemExConfigCutDownItem ?  itemExConfigCutDownItem.VALUE_DESC: ""; 
            item.EX_SURCHRG = itemExSurchrg;
            item.BOM = {
                orderId: data.IM_SALESDOCU, lineItemNumber: item.ITEMNO
            }
            item.INVENTORY = { orderId: data.IM_SALESDOCU };
            
            //ZEA_COLOR
            //ZEA_BRACKET_SH


            var aMaterialColor = item.MATERIAL ? item.MATERIAL.split("-"): [item.MATERIAL, ""];
            item.COLOR = aMaterialColor[1];
            item.MATERIAL = aMaterialColor[0] + "-" + item.SHORT_TEXT;

            return item;

        });
        return data.EX_ITEMS;
    }
}

