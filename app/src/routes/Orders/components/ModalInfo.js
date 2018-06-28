import React, { PureComponent, Fragment } from 'react';
import { Icon, Modal, List, Table } from 'antd';
export class ModalInfo extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        };
    }
    /**
     * 
     *
     * @param {String} title Title for Modal 
     * @param {Object} data Data you want to show it
     * @param {String} type t= Table / l=List
     */
    static show=(title,data,type,columns,keyTable)=> {

        let content;
        switch (type) {
            case "l":
                content = <div>
                    <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item.VALUE}</List.Item>)}
                        okText="Close"
                    />
                </div>;
                
                break;
            case "t":
                content = <div>
                    <Table
                        columns={columns}
                        dataSource={data}
                        size="small"
                        rowKey={record => eval("record." + keyTable)} /></div>
                break;
        
            default:
                break;
        }

        
        Modal.info({
            title: title,
            width:'80%',
            content: (
                content
            ),
            onOk() { },
        });
        
    }
}
