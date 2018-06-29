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
            ZSH: ZSHColumns.getColumns(),
            ZHZ: ZHZColumns.getColumns(),
            ZVT: ZVTColumns.getColumns(),
            ZMS: ZMSColumns.getColumns(),
            getRequest: function(aColumn) {
                var value = eval("this." + aColumn);
                return value;
            }
        }
    }
}
