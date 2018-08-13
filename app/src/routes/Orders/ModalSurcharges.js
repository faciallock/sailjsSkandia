import React, { PureComponent } from 'react';
import moment from 'moment';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';
import {
    Form, Table, Modal, Button, LocaleProvider 
} from 'antd';
const ModalSurcharges = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onOK, data,loading } = this.props;
            let dataFiltered={};
            if(data){
                dataFiltered=  data.length===undefined ? {} : data.filter((item)=>{return item.MARK==='X'})
            }else{
                dataFiltered=data;
            }
            
            const columns = [

               /*  {
                    title: 'Selected',
                    dataIndex: 'MARK',
                    key: 'MARK',

                }, */
                {
                    title: 'Surcharge Type',
                    dataIndex: 'COND_TYP',
                    key: 'COND_TYP',

                },
                {
                    title: 'Description',
                    dataIndex: 'VTEXT',
                    key: 'VTEXT'
                },
                {
                    title: 'Value',
                    dataIndex: 'COND_VAL',
                    key: 'COND_VAL',
                    render: (record) => {
                        return(<span>
                            {parseFloat(Math.round(record * 100)/ 100).toFixed(2)}
                        </span>);
                    }
                }
            ];
            console.log(data);

            return (
                <LocaleProvider locale={en_US}>
                <Modal
                    visible={visible}
                    title="Surchages Details"
                    width="80%"
                    onCancel={onOK}
                    footer={[
                        <Button key="submit" type="primary" loading={loading} onClick={onOK}>
                            Ok
                        </Button>
                    ]}
                >
                        
                            <Table
                                columns={columns}
                                dataSource={dataFiltered}
                                size="small"
                                loading={loading}
                                scroll={{ x: 800 }}
                            rowKey={record => record.COND_TYP} />
                            
                    
                 
                </Modal>
                </LocaleProvider>
            );
        }
    }
);
export default ModalSurcharges;