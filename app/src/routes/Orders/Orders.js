import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { List, Table, Form, Divider, Card, Alert, Tabs, Row, Col, Spin, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';

import StandardTable from '../../components/StandardTable';

import PageHeader from '../../components/PageHeader';
import OrderDetail from './OrderDetail';

import OrderShippingForm from './OrderShippingForm';
import OrderFreightForm from './OrderFreightForm';
import ViewOrderTable from './ViewOrderTable';
import ModalNewComment from './ModalNewComment';
import ModalBOM from './ModalBOM';
import ModalInventory from './ModalInventory';
import SearchForm from './SearchForm';

import { OrderTypes } from './map/OrderTypes';

import moment from 'moment';


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

const noMatch = <Alert message="No permission." type="error" showIcon />;


const breadcrumbList = [{
    title: 'Order Number',
}];
const breadcrumbTitle = [{
    title: 'Orders',
}];
@connect(({ orders, orderDetail,loading }) => ({
    orders,
    orderDetail:orders.orderDetail,
    userRoles: orders.userRoles,
    bomDetail: orders.bomDetail,
    inventoryDetail: orders.inventoryDetail,
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
        visibleNewComment:false,
        visibleBOM:false,
        visibleInventory:false,
        showSearch: false
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
                userType: localStorage.getItem('userType'), 
            },
        });

        this.props.dispatch({
            type: 'orders/getUserType',
            payload: {
                userId: localStorage.getItem('userName'),
            },
        });


    }
    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    onBomClick = (orderId, lineItemNumber)=>{
        console.log({orderId});
        console.log({ lineItemNumber });
        this.props.dispatch({
            type: 'orders/fetchBOM',
            payload: {
                orderId, lineItemNumber
            },
        });
        this.setState({
            visibleBOM: true,
        });
    }
    onInventoryClick = (orderId) => {
        console.log({ orderId });
        this.props.dispatch({
            type: 'orders/fetchInventory',
            payload: {
                orderId
            },
        });
        this.setState({
            visibleInventory: true,
        });
    }
    formatCommentDate=(date,time)=>{

        let dateJS = new Date(parseInt(date.substring(0, 4)), parseInt(date.substring(4, 6))-1, parseInt(date.substring(6, 8)), parseInt(time.substring(0, 2))-1, parseInt(time.substring(2, 4)), parseInt(time.substring(4, 6)))  //date+time;
        console.log(moment(dateJS).format("YYYY-MM-DD HH:mm:ss"));
        return moment(moment(dateJS).format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss").fromNow();
        
    }
    reverseComments = (items) => {
        if(items){
            return items.reverse();
        }
        else{
            return []
        }

        
        

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
    onOKBOM = () => {
        this.setState({ visibleBOM: false })
    }
    onOKInventory = () => {
        this.setState({ visibleInventory: false })
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


    handleSearch = (payload) =>{


        //payload.UserName = localStorage.getItem('userName');
        payload.UserName = localStorage.getItem('userName'), 
        payload.UserIndicator = localStorage.getItem('userType'), 
        payload.DealerNumber = "";

        



        if( typeof payload.OrderNumber == "undefined"){payload.OrderNumber = ""; };
        if( typeof payload.Sidemark == "undefined" ){ payload.Sidemark = "";}; 
        if( typeof payload.CustomerNumber == "undefined" ){ payload.CustomerNumber = ""; };
        if( typeof payload.Name == "undefined" ){ payload.Name = "";};
        if( typeof payload.OrderDate == "undefined" || payload.OrderDate == null){ payload.OrderDate = "";};
        if( typeof payload.ShippedDate == "undefined" || payload.ShippedDate == null){ payload.ShippedDate = ""; };
        if( typeof payload.ShippedBy == "undefined" ){ payload.ShippedBy = "";};
        if( typeof payload.TotalPrice == "undefined" ){ payload.TotalPrice = "";};
        if( typeof payload.Status == "undefined" ){ payload.Status = "";} ;

        if( payload.OrderNumber != "") {payload.OrderNumber = payload.OrderNumber.padStart(10, '0'); };
        if( payload.CustomerNumber != "") {payload.CustomerNumber = payload.CustomerNumber.padStart(10, '0'); };
        
        if( payload.OrderDate != "") { payload.OrderDate = payload.OrderDate.format("YYYYMMDD"); };
        if( payload.ShippedDate != "") { payload.ShippedDate = payload.ShippedDate.format("YYYYMMDD"); };

        


        this.props.dispatch({
            type: 'orders/search',
            payload: payload,
        });
    }

    toggleSearch = () =>{

    this.setState({
        showSearch: !this.state.showSearch,
    });
    

    }

    


    handleClick = (value) => {
        this.openDetail(value);


    }

    render() {
        console.log(this.props);
        const { orders: { orders }, orderDetail, bomDetail, inventoryDetail, userRoles, loading } = this.props;
        console.log(userRoles);
        const { selectedRows, modalVisible, visibleNewComment, visibleBOM, visibleInventory } = this.state;
        
        if ( localStorage.getItem('userType') != "D"){
        
        var columns = [
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
                    
                    let value = text === 'C'? "Confirmed":"Pending";
       
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


    }else{

        var columns = [
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
                title: 'Product',
                dataIndex: 'DESC',
                key: 'DESC',
                sorter: true
            },
            {
                title: 'Status',
                dataIndex: 'IND',
                key: 'IND',
                render: (text, record) => {
                    
                    let value = text === 'C'? "Confirmed":"Pending";
       
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

    }
        
        

        /* const actionInputSearch = (
            <div>
                <Input.Search
                    placeholder="Number Order here"
                    onSearch={this.handleClick}
                    style={{ width: 250 }}
                    defaultValue="0010010628"
                    enterButton
                />
            </div>
        ); */
        let ZF00 = [{ COND_VAL: "" }], ZCOD = [{ COND_VAL: "" }], JR1 = [{ COND_VAL: "" }];
        

        if (orderDetail.EX_CONDITIONS !== undefined) {
            ZF00 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "ZF00" });
            ZCOD = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "ZCOD" });
            JR1 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "JR1" });
        }

        /* let commonData = CommonDataManager.getInstance();
        let roles = commonData.getRoles(); */
        //console.log(roles);
        
            
       
        return (
            <IntlProvider locale="en">
            <PageHeaderLayout title=""
            content={
                <div style={{textAlign: "right",position:'relative',top:'-20px'} }>
                <Button  style={{ marginLeft: 8 }} onClick={this.toggleSearch}><Icon type="search"  style={{ color: '#1d2d5c' }}/>
                    Show search <Icon type={this.state.showSearch ? 'up' : 'down'} />
                    </Button>
                    { this.state.showSearch &&                                                                             
                    <SearchForm handleSearch={this.handleSearch}/> }
                </div>}
            breadcrumbList={breadcrumbTitle} 
             >
                    <ModalNewComment
                        wrappedComponentRef={this.saveFormRefComment}
                        visible={visibleNewComment}
                        onCancel={this.onCancelNewComment}
                        onCreate={()=>{
                            this.handleOkNewComment(orderDetail.IM_SALESDOCU)
                            }}
                    />
                    <ModalBOM
                        visible={visibleBOM}
                        onOK={this.onOKBOM}
                        data={bomDetail}
                        loading={loading}
                    />
                    <ModalInventory
                        visible={visibleInventory}
                        onOK={this.onOKInventory}
                        data={inventoryDetail}
                        loading={loading}
                    />
                    
                   
                    
                         
                    <Modal
                        title="View Order Details"
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
                                title={<div className="title">{orderDetail.IM_SALESDOCU}</div>}
                                action={
                                    <div style={{textAlign:'left',paddingLeft:'30px',position:'relative',top:'-5px'}}>
                                        <Row>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Company:</b> {orderDetail.EX_CUST ? orderDetail.EX_CUST.split("-")[1]: ""}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Account:</b> {orderDetail.EX_CUST ? orderDetail.EX_CUST.split("-")[0]: ""}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Sales Org:</b> {orderDetail.EX_ORG}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Order Type:</b> {OrderTypes.types().getRequest(orderDetail.EX_DOCTYP) } 
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Order Status:</b> {orderDetail.EX_IND == 'C'? 'Confirmed':'Pending'}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Order Status #2:</b> {orderDetail.EX_ORDSTATUS}
                                            </Col>
                                        </Row>
                                    </div>
                                    }
                                breadcrumbList={breadcrumbList}
                                logo={<Icon style={{ fontSize: 48, color: '#1d2d5c' }}   type="file-text"/>}
                                content={<div className="content">
                                    <Divider style={{margin:'12px 0',top:'-12px'}} />

                                    <Row gutter={12}>
                                        <Col lg={8} md={8} sm={12}>
                                            <b>Payment Terms:</b> {orderDetail.EX_BILL_TERM ? orderDetail.EX_BILL_TERM.VALUE : ""}  
                                        </Col>
                                        {localStorage.getItem('userType') != "D" &&<Col lg={8} md={8} sm={12}>
                                            <b>Created By:</b> {orderDetail.EX_CSR}
                                        </Col> &&
                                        <Col lg={8} md={8} sm={12}>
                                            <b>Last Modified By:</b> {orderDetail.EX_LASTCHANGE}
                                        </Col>}
                                    </Row>
                                    <Row gutter={12}>
                                    {localStorage.getItem('userType') != "D" && <Col lg={8} md={8} sm={12}>
                                            <b>Net Value:</b> <FormattedNumber style="currency" currency="USD"  value= {orderDetail.EX_NETVAL}/> 
                                     </Col> }
                                        <Col lg={8} md={8} sm={12}>
                                            <b>Rush Charges Cat.:</b> {orderDetail.EX_PRODRUSH ? orderDetail.EX_PRODRUSH.split("-")[1]: ""}
                                        </Col>
                                        <Col lg={8} md={8} sm={12}>
                                            <b>S/H Charges:</b> {(typeof ZF00[0] === 'undefined') ? false :parseFloat(Math.round(ZF00[0].COND_VAL * 100)/ 100).toFixed(2)  }
                                        </Col>
                                    </Row>
                                    <Row gutter={12}>
                                        <Col lg={8} md={8} sm={12}>
                                            <b>COD Charges:</b> {(typeof ZCOD[0] === 'undefined') ? false : parseFloat(Math.round(ZCOD[0].COND_VAL * 100)/ 100).toFixed(2) }
                                        </Col>
                                        <Col lg={8} md={8} sm={12}>
                                            <b>Taxes:</b> {(typeof JR1[0] === 'undefined') ? false : parseFloat(Math.round(JR1[0].COND_VAL * 100) / 100).toFixed(2) }
                                        </Col>
                                        <Col lg={8} md={8} sm={12}>
                                            <b>Grand Total:</b><div style={{color:"#e24c02"}}><FormattedNumber style="currency" currency="USD"  value= {orderDetail.EX_NETVAL}/> </div>
                                        </Col>
                                    </Row>
                                    
                                    {/* <Row gutter={12}>
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
                                            <b>S/H Charges:</b> {(typeof ZF00[0] === 'undefined') ? false : ZF00[0].COND_VAL}
                                        </Col>
                                        <Col lg={5} md={8} sm={12}>
                                            <b>COD Charges:</b> {(typeof ZCOD[0] === 'undefined') ? false : ZCOD[0].COND_VAL}
                                            
                                        </Col>
                                        
                                        <Col lg={5} md={8} sm={12}>
                                            <b>Taxes:</b> {(typeof JR1[0] === 'undefined') ? false : JR1[0].COND_VAL}
                                        </Col>
                                        <Col lg={4} md={8} sm={12}>

                                        </Col>
                                    </Row> */}
                                </div>}
                            />
                        
                            
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab={<span><Icon type="table" />Items</span>} key="1">
                                    <ViewOrderTable data={orderDetail} onBomClick={this.onBomClick} onInventoryClick={this.onInventoryClick} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="solution" /> Shipping Information</span>} key="2">
                                        <OrderShippingForm data={orderDetail} />
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="inbox" />Freight</span>} key="3">
                                        <OrderFreightForm data={orderDetail} />
                                    </TabPane>
                                    { localStorage.getItem('userType') != "D" && <TabPane tab={<span><Icon type="message" />Comments</span>} key="4">
                                            <Row gutter={12}>
                                            <Col lg={24} md={24} sm={24} style={{textAlign:'right', padding:'6px'}}>
                                            <Button 
                                                onClick={this.openModalComment} 
                                                type="primary"><Icon type="message" /> Add comment</Button>

                                            {/* (typeof userRoles.roles === 'undefined') ? false : userRoles.roles.comments.c  */}
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
                                                            renderItem={item => (
                                                                
                                                                        <List.Item
                                                                    actions={[
                                                                        <span style={{ color:'#1d2d5c',fontSize:'0.8rem'}}>
                                                                                        
                                                                            {this.formatCommentDate(item.ERDAT, item.ERZET)} <Icon type="clock-circle-o" />
                                                                            
                                                                                </span>
                                                                            ]}
                                                                        >
                                                                            
                                                                                
                                                                                
                                                                            
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
                                    
                                        
                                        
                                        
                                    </TabPane> }
                                </Tabs>
                            
                        
                        </Spin>
                        
                    </Modal>

                    

                    <Card bordered={false}>
                        <Table
                            loading={loading}
                            dataSource={orders}
                            columns={columns}
                            size="small"
                            scroll={{ x: 1200 }}
                            rowKey={record => record.VBELN}
                        />
                    </Card>

                    
                
            </PageHeaderLayout>
            </IntlProvider>
        );
    }
}
