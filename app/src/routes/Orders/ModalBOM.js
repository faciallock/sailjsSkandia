import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, Table, Modal, Button, LocaleProvider 
} from 'antd';
const ModalBOM = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onOK, data,loading } = this.props;
            const columns = [
                {
                    title: 'Item',
                    dataIndex: 'ITEM_NO',
                    key: 'ITEM_NO',
                    fixed: 'left',
                    width: 70
                },
                {
                    title: 'Component',
                    dataIndex: 'COMPONENT',
                    key: 'COMPONENT'
                },
                {
                    title: 'Color',
                    dataIndex: 'ZZ_COLOR',
                    key: 'ZZ_COLOR'
                },
                {
                    title: 'Item Text',
                    dataIndex: 'ITEM_TEXT1',
                    key: 'ITEM_TEXT1'
                },
                {
                    title: 'Quantity',
                    dataIndex: 'ZZ_QTY',
                    key: 'ZZ_QTY'
                },
                {
                    title: 'Unit',
                    dataIndex: 'COMP_UNIT',
                    key: 'COMP_UNIT'
                },
                {
                    title: 'Short Text',
                    dataIndex: 'SORTSTRING',
                    key: 'SORTSTRING'
                },
                {
                    title: 'Piece Width',
                    dataIndex: 'ZZ_PIECE_WIDTH',
                    key: 'ZZ_PIECE_WIDTH'
                },
                {
                    title: 'Piece Length',
                    dataIndex: 'ZZ_PIECE_LENGTH',
                    key: 'ZZ_PIECE_LENGTH'
                },
                {
                    title: 'Piece Quantity',
                    dataIndex: 'ZZ_PIECE_QTY',
                    key: 'ZZ_PIECE_QTY'
                }
            ];

            return (
                <LocaleProvider locale={en_US}>
                <Modal
                    visible={visible}
                    title="BOM Details"
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
                                dataSource={data.EX_BOM}
                                size="small"
                                loading={loading}
                                scroll={{ x: 1100 }}
                            rowKey={record => record.ITEM_NO} />
                            
                    
                 
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalBOM;