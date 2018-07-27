import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, List, Modal, Button, LocaleProvider 
} from 'antd';
const ModalDiscount = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onOK, data,loading } = this.props;
            

            return (
                <LocaleProvider locale={en_US}>
                <Modal
                    visible={visible}
                    title="Discount"
                    width="40%"
                    onCancel={onOK}
                        footer={[
                            <Button key="submit" type="primary" loading={loading} onClick={onOK}>
                                Ok
            </Button>
                        ]}
                >
                        
                            {/* <Table
                                columns={columns}
                                dataSource={data.EX_BOM}
                                size="small"
                                loading={loading}
                                scroll={{ x: 1100 }}
                            rowKey={record => record.ITEM_NO} /> */}

                            <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item.VALUE}</List.Item>)}
                        okText="Close"
                    />
                            
                    
                 
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalDiscount;