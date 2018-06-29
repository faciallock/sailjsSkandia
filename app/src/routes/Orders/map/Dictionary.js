import React, { PureComponent, Fragment } from 'react';
import { Icon,Modal,List,Button } from 'antd';
import {ModalInfo} from '../components/ModalInfo';
import { ZSDColumns } from './ZSDColumns';
import { ZSHColumns } from './ZSHColumns';
import { ZHZColumns } from './ZHZColumns';
import { ZVTColumns } from './ZVTColumns';
import { ZMSColumns } from './ZMSColumns';



export class Dictionary {
    
    static requestColumns(onBomClick, onInventoryClick){
        return {
            ZSD: ZSDColumns.getColumns(onBomClick, onInventoryClick),
            ZSH: ZSHColumns.getColumns(onBomClick, onInventoryClick),
            ZHZ: ZHZColumns.getColumns(onBomClick, onInventoryClick),
            ZVT: ZVTColumns.getColumns(onBomClick, onInventoryClick),
            ZMS: ZMSColumns.getColumns(onBomClick, onInventoryClick),
            getRequest: function(aColumn) {
                var value = eval("this." + aColumn);
                return value;
            }
        }
    }
}
