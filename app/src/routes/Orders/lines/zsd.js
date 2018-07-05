import React, { PureComponent } from 'react';
export class zsd extends React.PureComponent {

    
    static renderLineItems=(data)=>{
        data.EX_ITEMS.map((item) => {
            let aType = item.CLASS.split('_')
            let itemExConfigWidth = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_WIDTH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigLength = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_LENGTH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigBracket = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_BRACKET_SH` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigCords = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_CORDS` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigPanelSize = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_PANEL_SIZE` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigExtB = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_EXTB` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigSpecialOne = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_2ON1` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigSpecialTwo = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_2ON2` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExCondGrossPrice = data.EX_CONDITIONS.find((itemCond) => { return itemCond.COND_TYP == `ZPR0` && itemCond.ITEMNO === parseInt(item.ITEMNO) });
            let itemExConfigDraw = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_DRAW` && itemConfig.ITEMNO === item.ITEMNO });
            let itemExConfigPanels = data.EX_CONFIG.find((itemConfig) => { return itemConfig.CHAR_NAME == `${aType[0]}_PANELS` && itemConfig.ITEMNO === item.ITEMNO });
            //let aDiscount=data.EX_CONDITIONS.filter((itemCond) => { return itemCond.COND_TYP === "ZBD1" || itemCond.COND_TYP === "ZBD2" || itemCond.COND_TYP === "ZBD3" || itemCond.COND_TYP === "ZBD4" });

            //let aDiscount = data.EX_CONDITIONS.filter((itemCond) => { return itemCond.COND_TYP === "ZBD1" || itemCond.COND_TYP === "ZBD2" || itemCond.COND_TYP === "ZBD3" || itemCond.COND_TYP === "ZBD4" && itemCond.ITEMNO === parseInt(item.ITEMNO) });
            let aDiscount = data.EX_CONDITIONS.filter((itemCond) => { return (itemCond.COND_TYP === "ZBD1" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD2" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD3" && itemCond.ITEMNO === parseInt(item.ITEMNO)) || (itemCond.COND_TYP === "ZBD4" && itemCond.ITEMNO === parseInt(item.ITEMNO)) });
            
            let itemExSurchrg = data.EX_SURCHRG.filter((itemSurchrg) => { return itemSurchrg.ITEMNO === parseInt(item.ITEMNO) });
            

            item.WIDTH = itemExConfigWidth ? itemExConfigWidth.VALUE_CHAR: "";
            item.LENGTH = itemExConfigLength ? itemExConfigLength.VALUE_CHAR: "";
            item.BRACKETMOUNT = itemExConfigBracket? itemExConfigBracket.VALUE_DESC: "";
            item.LIFTCORD = itemExConfigCords ? itemExConfigCords.VALUE_DESC: "";
            
            //item.PANELS = itemExConfigPanelSize.VALUE_CHAR: "";

            item.DRAWLINER = itemExConfigDraw ? itemExConfigDraw.VALUE_DESC: "";
            item.PANELS = itemExConfigPanels ? itemExConfigPanels.VALUE_CHAR: "";
            

            item.BRACKETS = itemExConfigExtB ? itemExConfigExtB.VALUE_DESC: "";
            item.SPECIALSONE= itemExConfigSpecialOne ? itemExConfigSpecialOne.VALUE_DESC: "";
            item.SPECIALSTWO = itemExConfigSpecialTwo ? itemExConfigSpecialTwo.VALUE_DESC: "";
            item.GROSSPRICE = itemExCondGrossPrice ? itemExCondGrossPrice.COND_VAL: "";
            item.BESTDISCOUNT = aDiscount;
            item.EX_SURCHRG = itemExSurchrg;
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

