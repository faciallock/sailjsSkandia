import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, Table, Icon, Modal, Button, LocaleProvider 
} from 'antd';



const ModalDiscountCustomer = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onOK, data,loading, onKunnrSelection } = this.props;

            const columns = [
                {
                    title: 'Customer Number',
                    dataIndex: 'KUNNR',
                    key: 'KUNNR'          
                },
                {
                    title: 'Customer Name',
                    dataIndex: 'NAME1',
                    key: 'NAME1'          
                },{
                    title: 'Action',
                    key: 'operation',
                    render: (record) => {
            
                        console.log(record.KUNNR);
                           
                        
                        return (
                            <a onClick={() => onKunnrSelection(record.KUNNR)} ><Icon type="eye-o" /> Select</a>
                        )
                    }
                },
            ];
            

            return (
                <LocaleProvider locale={en_US}>
                <Modal
                    visible={visible}
                    title="Customers"
                    width="60%"
                    onCancel={onOK}
                        footer={[
                            <Button key="submit" type="primary" loading={loading} onClick={onOK}>
                                Ok
            </Button>
                        ]}
                >
                        
                            

                            {/* <List
                        bordered
                        dataSource={data}
                        renderItem={item => (<List.Item>{item.NAME1}</List.Item>)}
                        okText="Close"
                    /> */}

                    <Table
                        loading={loading}
                        dataSource={data}
                        
                        columns={columns}
                        rowKey={record => record.KUNNR}
                        pagination = {{pageSize: 15}}
                    />
                            
                    
                 
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalDiscountCustomer;