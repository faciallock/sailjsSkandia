import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Table, Card, Tabs, Row, Col, Spin, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';
import StandardTable from '../../components/StandardTable';
import OrderDetail from './OrderDetail';
import OrderShippingForm from './OrderShippingForm';
import OrderFreightForm from './OrderFreightForm';
import ViewOrderTable from './ViewOrderTable';



import PageHeaderLayout from '../../layouts/PageHeaderLayout';

//import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { Search } = Input;
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
        currentOrder:0,
        currentOrderDetail: {}
    }
    componentDidMount() {
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
        this.openDetail(record.VBELN)
        
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
            
        {
            /* if (typeof orderDetail.IM_SALESDOCU !== "undefined" && loading==false) {
                console.log("open modal");
                this.setState({ currentOrder: orderDetail.IM_SALESDOCU});
                this.showModal(null, orderDetail);

            } */
        }
        return (
            
            <PageHeaderLayout title="Orders" action={actionInputSearch} >
                <div >
                    
                    <Modal
                        title="Order Detail"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        closable={false}
                        okText="OK"

                        footer={[
                            <Button key="submit" loading={loading} onClick={this.hideModal}>
                                <Icon type="close" /> Close
                            </Button>,
                        ]}
                        width='90%'
                    >
                        
                        <Row gutter={16} type="flex" justify="center">
                            <Col style={{ textAlign:'center'}} justify="center" span={24}><Spin size="large" spinning={loading} tip="Loading order detail..." /></Col>
                        </Row>
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
                                <List
                                    bordered
                                    dataSource={data}
                                    renderItem={item => (<List.Item>{item}</List.Item>)}
                                />
                            </TabPane>
                        </Tabs>
                        
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
