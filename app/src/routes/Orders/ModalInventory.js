import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, Table, Modal, Button, LocaleProvider 
} from 'antd';
const ModalInventory = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onOK, data,loading } = this.props;
            const columns = [
                {
                    title: 'Component',
                    dataIndex: 'COMPONENT',
                    key: 'COMPONENT'
                },
                {
                    title: 'Text',
                    dataIndex: 'COMPONENT',
                    key: 'COMPONENT'
                },
                {
                    title: 'Component Quantity',
                    dataIndex: 'ZZ_COLOR',
                    key: 'ZZ_COLOR'
                },
                {
                    title: 'Available Quantity',
                    dataIndex: 'ITEM_TEXT1',
                    key: 'ITEM_TEXT1'
                },
                {
                    title: 'SO Quantity',
                    dataIndex: 'ZZ_QTY',
                    key: 'ZZ_QTY'
                },
                {
                    title: 'PO Quantity',
                    dataIndex: 'COMP_UNIT',
                    key: 'COMP_UNIT'
                },
                {
                    title: 'PO Date',
                    dataIndex: 'SORTSTRING',
                    key: 'SORTSTRING'
                }
            ];

            return (
                <LocaleProvider locale={en_US}>
                <Modal
                    visible={visible}
                    title="Inventory Details"
                    width="80%"
                    okText="OK"
                        footer={[
                            <Button key="submit" type="primary" loading={loading} onClick={onOK}>
                                Ok
            </Button>
                        ]}
                >
                        
                            <Table
                                columns={columns}
                            dataSource={data.EX_INV}
                                size="small"
                                loading={loading}
                                scroll={{ x: 800 }}
                            rowKey={record => record.ITEM_NO} />
                            
                    
                 
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalInventory;