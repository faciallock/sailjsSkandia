import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Table, Form, Divider, Card, Tabs, Row, Col, Spin, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';

import StandardTable from '../../components/StandardTable';
import PageHeader from '../../components/PageHeader';
import OrderDetail from './OrderDetail';

import OrderShippingForm from './OrderShippingForm';
import OrderFreightForm from './OrderFreightForm';
import ViewOrderTable from './ViewOrderTable';
import ModalNewComment from './ModalNewComment';
import { routerRedux } from 'dva/router';
import { IntlProvider,FormattedNumber } from 'react-intl';
import _ from 'lodash';



import PageHeaderLayout from '../../layouts/PageHeaderLayout';

//import styles from './BasicList.less';
import styles from './css/Orders.css';

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
const breadcrumbList = [{
    title: 'Order Number',
}];
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
        currentRecord: {},
        visibleNewComment:false
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
    saveFormRefComment = (formRef) => {
        this.formRefComment = formRef;
    }

    openModalComment = () => {
        this.setState({ visibleNewComment:true})
        
    }
    onCancelNewComment=() =>{
        this.setState({ visibleNewComment: false })
    }
    handleOkNewComment =(documentId)=>{
        const form = this.formRefComment.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();

            this.props.dispatch({
                type: 'orders/addComment',
                payload: {
                    comment: values.comments,
                    orderId: documentId,
                    userName: localStorage.getItem('userName')
                    
                },
            });
            form.resetFields();
            this.setState({ visibleNewComment: false });
            /* this.props.dispatch({
                type: 'orders/fetchDetail',
                payload: {
                    orderId: documentId,
                }
            }); */

            /* console.log('Received values of form: ', values);


            this.props.dispatch({
                type: 'comments/insertComment',
                payload: {
                    comment: values.comments,
                    commentCompany: this.state.companyId,
                    commentUser: localStorage.getItem('userId'),
                    commentStep: this.state.current + 1,
                    commentType: parseInt(this.state.currentTab)
                },
            });


            form.resetFields();
            this.setState({ visibleComment: false });
            this.props.dispatch({
                type: 'steps/fetchDetail',
                payload: {
                    companyId: this.state.companyId
                },
            }); */


        });
            
    }


    handleClick = (value) => {
        this.openDetail(value);


    }

    render() {
        console.log(this.props);
        const { orders: { orders }, orderDetail, loading } = this.props;
        //console.log(orders.orderDetail);
        const { selectedRows, modalVisible, visibleNewComment } = this.state;
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
                render: (text, record) => {
                    let value= record ==='C'? "Confirmed":"Pending";
                    return (
                        <span>{value}</span>
                    )
                }
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
        let ZF00 = [{ COND_VAL: "" }], ZCOD = [{ COND_VAL: "" }], JR1 = [{ COND_VAL: "" }];
        

        if (orderDetail.EX_CONDITIONS !== undefined) {
            ZF00 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "ZF00" });
            ZCOD = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "ZCOD" });
            JR1 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "JR1" });
        }
        
            
       
        return (
            <IntlProvider locale="en">
            <PageHeaderLayout title="Orders" action={actionInputSearch} >
                    <ModalNewComment
                        wrappedComponentRef={this.saveFormRefComment}
                        visible={visibleNewComment}
                        onCancel={this.onCancelNewComment}
                        onCreate={()=>{
                            this.handleOkNewComment(orderDetail.IM_SALESDOCU)
                            }}
                    />        
                    <Modal
                        title="Order Detail"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        okText="OK"
                        closable={false}

                        footer={[
                            <Button key="submit" onClick={this.hideModal}>
                                <Icon type="close" /> Close
                            </Button>,
                        ]}
                        width='90%'
                    >
                        <Spin size="large" spinning={loading} tip="Loading order detail..." >
                            <PageHeader
                                style={{padding:'1px'}}
                                title={<div className="title">{this.state.currentRecord.VBELN}</div>}
                                action={
                                    <div style={{textAlign:'left'}}>
                                        <Row>
                                            <Col lg={12} md={12} sm={24}>
                                                <b>Order Type:</b> {orderDetail.EX_DOCTYP} 
                                            </Col>
                                            <Col lg={12} md={12} sm={24}>
                                                <b>Order Status:</b> {orderDetail.EX_ORDSTATUS}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} md={12} sm={24}>
                                                <b>Created By:</b> {orderDetail.EX_CSR}
                                            </Col>
                                            <Col lg={12} md={12} sm={24}>
                                                <b>Last Modified By:</b> {orderDetail.EX_LASTCHANGE}
                                            </Col>
                                        </Row>
                                    </div>
                                    }
                                breadcrumbList={breadcrumbList}
                                logo={<Icon style={{ fontSize: 48, color: '#08c' }}   type="file-text"/>}
                                content={<div className="content">
                                    
                                    <Row gutter={12}>
                                        <Col lg={5} md={8} sm={12}>
                                            <b>Desc:</b> {this.state.currentRecord.DESC}  
                                        </Col>
                                        <Col lg={5} md={8} sm={12}>
                                            <b>Customer Account:</b> {this.state.currentRecord.KUNNR}
                                        </Col>
                                        <Col lg={5} md={8} sm={12}>
                                            <b>Name:</b> {this.state.currentRecord.NAME1}
                                        </Col>
                                        <Col lg={5} md={8} sm={12}>
                                            
                                            <b>Rush Charges Cat:</b> {orderDetail.EX_PRODRUSH}
                                        </Col>
                                        <Col lg={4} md={8} sm={12}>
                                            <b>Sales Org:</b>{orderDetail.EX_ORG}
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        
                                        <Col lg={5} md={8} sm={12}>
                                            <b>Net Value:</b>  <FormattedNumber style="currency" currency="USD"  value= {orderDetail.EX_NETVAL}/>
                                        </Col>
                                        <Col lg={5} md={8} sm={12}>
                                            <b>S/H Charges:</b> {ZF00[0].COND_VAL}
                                        </Col>
                                        <Col lg={5} md={8} sm={12}>
                                            <b>COD Charges:</b> {ZCOD[0].COND_VAL}
                                            
                                        </Col>
                                        
                                        <Col lg={5} md={8} sm={12}>
                                            <b>Taxes:</b>{JR1[0].COND_VAL}
                                        </Col>
                                        <Col lg={4} md={8} sm={12}>

                                        </Col>
                                    </Row>
                                </div>}
                            />
                        
                            
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab={<span><Icon type="solution" /> Shipping Information</span>} key="1">
                                        <OrderShippingForm data={orderDetail} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="inbox" />Freight</span>} key="2">
                                        <OrderFreightForm data={orderDetail} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="table" />Items</span>} key="3">
                                        <ViewOrderTable data={orderDetail} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="message" />Comments</span>} key="4">
                                            <Row gutter={12}>
                                            <Col lg={24} md={24} sm={24} style={{textAlign:'right', padding:'6px'}}>
                                            <Button onClick={this.openModalComment} type="primary"><Icon type="message" /> Add comment</Button>
                                            </Col>
                                            </Row>
                                            <Row gutter={12}>
                                                <Col lg={24} md={24} sm={24}>
                                            <div style={{
                                                height: '350px'
                                            }}>
                                            <div style={{
                                                height: '90%',
                                                overflowY: 'auto', margin: '5px 0px'
                                            }} >
                                                {console.log(orderDetail.EX_USERLOG)}
                                                        <List
                                                            bordered
                                                            size="small"
                                                            dataSource={orderDetail.EX_USERLOG}
                                                    renderItem={item => (<List.Item>
                                                                            <List.Item.Meta
                                                                                avatar={<Avatar icon="user" />}
                                                                                title={item.ERNAM}
                                                                                description={item.ZCOMMENT}
                                                                            />
                                                                            
                                                                            </List.Item>)}
                                                            
                                                        />
                                                    </div>
                                                    </div>
                                                </Col>
                                                
                                            </Row>
                                    
                                        
                                        
                                        
                                    </TabPane>
                                </Tabs>
                            
                        
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

                    
                
            </PageHeaderLayout>
            </IntlProvider>
        );
    }
}
