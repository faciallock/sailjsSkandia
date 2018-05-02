import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Table, Form, Divider, Card, Tabs, Row, Col, Spin, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';

import StandardTable from '../../components/StandardTable';
import OrderDetail from './OrderDetail';
import OrderShippingForm from './OrderShippingForm';
import OrderFreightForm from './OrderFreightForm';
import ViewOrderTable from './ViewOrderTable';
import { routerRedux } from 'dva/router';



import PageHeaderLayout from '../../layouts/PageHeaderLayout';

//import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { Search } = Input;
const { TextArea } = Input;
const data = [
    'Comment 1',
    'comment 2',
    'Comment 3'
];

@connect(({ orders, orderDetail,loading }) => ({
    orders,
    orderDetail:orders.orderDetail,
    loading: loading.models.orders
}))
export default class OrderView extends PureComponent {
    
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
        visible: false,
        currentRecord: {}
    }
    componentDidMount() {
        if(localStorage.getItem('userName') ===null){
            //routerRedux.push("");
            this.props.dispatch(routerRedux.push('/user/login'))
        }
        this.props.dispatch({
            type: 'orders/fetch',
            payload: {
                userName: localStorage.getItem('userName'),
            },
        });


    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }
    showModal = (record, orderDetail) =>{
        this.openDetail(record.VBELN);
        this.setState({
            currentRecord: record,
        });
    
        
        
    }

    openDetail = vbeln =>{
        this.setState({
            visible: true
        });
        this.props.dispatch({
            type: 'orders/fetchDetail',
            payload: {
                orderId: vbeln,
            },
        });
    }


    handleClick = (value) => {
        this.openDetail(value);


    }

    render() {
        console.log(this.props);
        const { orders: { orders }, orderDetail, loading } = this.props;
        //console.log(orders.orderDetail);
        const { selectedRows, modalVisible } = this.state;
        const columns = [
            {
                title: 'Order No',
                dataIndex: 'VBELN',
                key: 'VBELN',
                fixed: 'left',
                width: 140
            },
            {
                title: 'Sidemark/PO',
                dataIndex: 'BSTNK',
                key: 'BSTNK'
            },
            {
                title: 'Customer Account',
                dataIndex: 'KUNNR',
                key: 'KUNNR'
            },
            {
                title: 'Name',
                dataIndex: 'NAME1',
                key: 'NAME1'
            },
            {
                title: 'Product',
                dataIndex: 'DESC',
                key: 'DESC',
                sorter: true
            },
            {
                title: 'Total Price',
                dataIndex: 'NETWR',
                key: 'NETWR',
                sorter: true
            },
            {
                title: 'Status',
                dataIndex: 'IND',
                key: 'IND',
            }, {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record) => {
                    
                    return (
                        <a onClick={() => this.showModal(record,orderDetail)}><Icon type="eye-o" /> Show</a>
                    )
                }
            },
        ];
        
        

        const actionInputSearch = (
            <div>
                <Input.Search
                    placeholder="Number Order here"
                    onSearch={this.handleClick}
                    style={{ width: 250 }}
                    enterButton
                />
            </div>
        );
            
       
        return (
            
            <PageHeaderLayout title="Orders" action={actionInputSearch} >
                <div >
                    
                    <Modal
                        title="Order Detail"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        okText="OK"
                        closable={false}

                        footer={[
                            <Button key="submit" loading={loading} onClick={this.hideModal}>
                                <Icon type="close" /> Close
                            </Button>,
                        ]}
                        width='90%'
                    >
                        <Spin size="large" spinning={loading} tip="Loading order detail..." >
                        <Row gutter={16} type="flex" justify="center">
                            
                            <Card style={{ width: '100%' }}>
                                <Row>
                                    <Col style={{ 'text-align': 'right' }} justify="center" span={24}></Col>
                                </Row>
                                
                                <Row gutter={12}>
                                    <Col lg={8} md={24} sm={24}>
                                    
                                        <b>Order No:</b> {this.state.currentRecord.VBELN}
                                    </Col>
                                    <Col lg={8} md={24} sm={24}>
                                        <b>Customer Account:</b> {this.state.currentRecord.KUNNR}
                                    </Col>
                                    <Col lg={8} md={24} sm={24}>
                                        <b>Name:</b> {this.state.currentRecord.NAME1}<br/>
                                    </Col>
                                </Row>
                                <Row gutter={12}>
                                    <Col lg={8} md={24} sm={24}>
                                        <b>Sales Org:</b> {orderDetail.EX_ORG}
                                    </Col>
                                    <Col lg={8} md={24} sm={24}>
                                        <b>Desc:</b> {this.state.currentRecord.DESC}
                                    </Col>
                                </Row>
                                
                            </Card>
                            
                        </Row>
                        <Row gutter={16} type="flex" justify="center">
                            <Card style={{ width: '100%' }}>
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab={<span><Icon type="solution" /> Shipping Information</span>} key="1">
                                        <OrderShippingForm data={orderDetail} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="inbox" />Freight</span>} key="2">
                                        <OrderFreightForm data={orderDetail} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="table" />Items</span>} key="3">
                                        <ViewOrderTable data={orderDetail.EX_ITEMS} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="message" />Comments</span>} key="4">
                                            <Row gutter={12}>
                                                <Col lg={16} md={16} sm={24}>
                                                    <Card style={{ 'height': '250px' }} >
                                                        <List
                                                            bordered
                                                            size="small"
                                                            dataSource={orderDetail.EX_USERLOG}
                                                            renderItem={item => (<List.Item>{item.ZCOMMENT}</List.Item>)}
                                                            pagination={{
                                                                onChange: (page) => {
                                                                    console.log(page);
                                                                },
                                                                pageSize: 3,
                                                            }}
                                                        />
                                                    </Card>
                                                </Col>
                                                <Col lg={8} md={8} sm={24}>
                                                    <Card style={{ 'height': '250px' }}>
                                                        <TextArea rows={2} />
                                                        <div style={{ 'text-align': 'right', 'padding-top': '3px'}}>
                                                            <Button  type="primary"><Icon type="message" /> Add comment</Button>

                                                        </div>
                                                       
                                                    </Card>
                                                </Col>
                                            </Row>
                                    
                                        
                                        
                                        
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </Row>
                        </Spin>
                        
                    </Modal>
                    <Card bordered={false}>
                        <Table
                            loading={loading}
                            dataSource={orders}
                            columns={columns}
                            scroll={{ x: 1200 }}
                            rowKey={record => record.VBELN}
                        />
                    </Card>

                    
                </div>
            </PageHeaderLayout>
        );
    }
}
