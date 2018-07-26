import React, { PureComponent, Fragment } from 'react';
import { Icon,Modal,List,Button } from 'antd';
import {ModalInfo} from '../components/ModalInfo';
import { ZSDColumns } from './ZSDColumns';
import { ZSHColumns } from './ZSHColumns';
import { ZHZColumns } from './ZHZColumns';
import { ZVTColumns } from './ZVTColumns';
import { ZMSColumns } from './ZMSColumns';



export class Dictionary {
    
    static requestColumns(onSurchargesClick, onBestDiscountClick, onBomClick, onInventoryClick){
        return {
            ZSD: ZSDColumns.getColumns(onSurchargesClick,onBestDiscountClick,onBomClick, onInventoryClick),
            ZSH: ZSHColumns.getColumns(onSurchargesClick,onBestDiscountClick,onBomClick, onInventoryClick),
            ZHZ: ZHZColumns.getColumns(onSurchargesClick,onBestDiscountClick,onBomClick, onInventoryClick),
            ZVT: ZVTColumns.getColumns(onSurchargesClick,onBestDiscountClick,onBomClick, onInventoryClick),
            ZMS: ZMSColumns.getColumns(onSurchargesClick,onBestDiscountClick,onBomClick, onInventoryClick),
            getRequest: function(aColumn) {
                var value = eval("this." + aColumn);
                return value;
            }
        }
    }
}
