import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { List, Table, Form, Divider, Card, Alert, Tabs, Row, Col, Spin, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal, LocaleProvider } from 'antd';

import StandardTable from '../../components/StandardTable';

import PageHeader from '../../components/PageHeader';



import ModalDiscountCustomer from './ModalDiscountCustomer';
import SearchForm from './SearchForm';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';



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
    title: 'Promotion Discount',
}];
@connect(({ discounts, nameDiscounts,loading, global }) => ({
    discounts,
    nameDiscounts:discounts.nameDiscounts,
    loading: loading.models.discounts
    

}))
export default class Discounts extends PureComponent {
    
    state = {
        expandForm: true,
        showSearch:true,
       
        visibleDiscountCustomer:false,
    }

    

    componentDidMount() {

        
        if(localStorage.getItem('userName') ===null){
            //routerRedux.push("");
            this.props.dispatch(routerRedux.push('/user/login'))
        }

        if(localStorage.getItem('customerNumber')){
            this.props.dispatch({
                type: 'discounts/fetchDiscountList',
                payload: {
                    iimKunnr: localStorage.getItem('customerNumber').padStart(10, '0'),
                },
            });
        }

        
        


    }

    onOKSearchDiscount = () => {
        this.setState({ visibleDiscountCustomer: false });

        /* this.props.dispatch({
            type: 'orders/fetchDetail',
            payload: {
                orderId: vbeln,
            },
        }); */
    }
    onKunnrSelection=(customerNumber)=>{
        console.log(customerNumber);
        this.setState({visibleDiscountCustomer:false})
        this.props.dispatch({
            type: 'discounts/fetchDiscountList',
            payload: {
                iimKunnr: customerNumber,
            },
        });

    }
    handleSearch = (payload) =>{

        //this.setState({visibleDiscountCustomer:true})
        console.log(payload);
        
        if( typeof payload.CustomerName == "undefined"){payload.CustomerName = ""; };
        if( typeof payload.CustomerNumber == "undefined" ){ payload.CustomerNumber = "";};

        
        
        if(payload.CustomerNumber!==""){

            this.props.dispatch({
                type: 'discounts/fetchDiscountList',
                payload: {
                    iimKunnr: payload.CustomerNumber.padStart(10, '0'),
                },
            });
        }

        if(payload.CustomerName!==""){

            this.setState({visibleDiscountCustomer:true});
            let currentPayloadSearch={}

            if(payload.typeSearch==="containsName"){
                currentPayloadSearch={
                    iimName: payload.CustomerName,
                    
                }
            } else{
                currentPayloadSearch={
                    iimName: payload.CustomerName,
                    startSearch:'X'
                }

            }
            

            this.props.dispatch({
                type: 'discounts/fetchDiscountListByName',
                payload: currentPayloadSearch,
            });
        }

        
        
        

        /* this.props.dispatch({
            type: 'orders/search',
            payload: payload,
        }); */
    }

    toggleSearch = () =>{

    this.setState({
        showSearch: !this.state.showSearch,
    });
    

    }


    


    

    render() {
        console.log(this.props);
        const { discounts: { discounts },  nameDiscounts, loading } = this.props;
        
        const { visibleDiscountCustomer, discountDetail} = this.state;
        let {sortedInfo }= this.state;
        console.log(discounts);
        console.log(nameDiscounts);
        
        sortedInfo = sortedInfo || {};

        var columns = [
            {
                title: 'Promo #',
                dataIndex: 'PROMO_NO',
                key:'PROMO_NO',
                fixed: 'left',
                width: 100,
                render: (text, record) => {
                    return (
                        <span>{`${record.PROMO_NO}-${record.PROMO_SEQ_NO}`}</span>
                    )
                }          
            },
            {
                title: 'Status',
                dataIndex: 'PROMO_APPROVAL'          
            },
            
            {
                title: 'Salesman #',
                dataIndex: 'PRSMAN'        
            },
            
            {
                title: 'Start on',
                dataIndex: 'PRSDAT',
                render: (record) => {
                    let dateJS = new Date(parseInt(record.substring(0, 4)), parseInt(record.substring(4, 6))-1, parseInt(record.substring(6, 8)))  //date+time;
                   // console.log(dateJS)
                    return (
                        <span>{ moment(dateJS).format("MM/DD/YYYY")}</span>
                    )

                    

                }          
            },
            {
                title: 'End on',
                dataIndex: 'PREDAT',
                render: (record) => {
                    let dateJS = new Date(parseInt(record.substring(0, 4)), parseInt(record.substring(4, 6))-1, parseInt(record.substring(6, 8)))  //date+time;
                   // console.log(dateJS)
                    return (
                        <span>{ moment(dateJS).format("MM/DD/YYYY")}</span>
                    )

                    

                }             
            },
            {
                title: 'Customer #',
                dataIndex: 'PROMO_KUNNR',
                render: (record) => {
                    let value = record.replace(/^0+/, '');
                    return (
                        <span>{ value}</span>
                    )

                    

                }     
                
                
            },
            
            {
                title: 'Customer Name',
                dataIndex: 'NAME'      
            },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 80,  
                render: (text, record) => {

                    
                       
                    
                    return (
                        <a onClick={() => {

                            console.log(record);
                            this.props.dispatch(routerRedux.push(`/discounts/main?promoNo=${record.PROMO_NO}&promoSeqNo=${record.PROMO_SEQ_NO}`))
                            }} ><Icon type="eye-o" /> Show</a>
                    )
                }
            },
        ];
        
            
       
        return (
            <IntlProvider locale="en">
            <PageHeaderLayout title=""
            content={
                <div style={{textAlign: "right",position:'relative',top:'-20px'} }>
                    {localStorage.getItem('userType') !== "D" &&
                    <div>
                        <Button  style={{ marginLeft: 8 }} onClick={this.toggleSearch} className="tour_button_hideSearch"><Icon type="search"  style={{ color: '#1d2d5c' }}/>
                        Hide search <Icon type={this.state.showSearch ? 'up' : 'down'} />
                        </Button>
                        { this.state.showSearch &&                                                                             
                        <SearchForm handleSearch={this.handleSearch}/> }
                    </div>
                    
                    }
                
                </div>}
            breadcrumbList={breadcrumbTitle} 
             >
                    

                    <ModalDiscountCustomer
                        visible={visibleDiscountCustomer}
                        onOK={this.onOKSearchDiscount}
                        data={nameDiscounts}
                        loading={loading}
                        onKunnrSelection={this.onKunnrSelection}
                    />
                    

                   
                    
                   
                    
                    
                    
                    <Card bordered={false}>
                        <LocaleProvider locale={en_US}>
                            <Row gutter={12}>
                                <Col lg={2} md={2} sm={24} xs={24}>
                                </Col>
                                <Col lg={20} md={20} sm={24} xs={24} >
                                
                                    <Table
                                        loading={loading}
                                        dataSource={discounts}
                                        size={"small"}
                                        columns={columns}
                                        rowKey={record => record.PROMO_NO}
                                        pagination = {{pageSize: 15}}
                                        scroll={{ x: 900 }}
                                    />
                                    
                                </Col>
                                <Col lg={2} md={2} sm={24} xs={24}>
                                    
                                </Col>
                            
                            </Row>
                            
                            
                        </LocaleProvider>
                    </Card>


                    
                
            </PageHeaderLayout>
            </IntlProvider>
        );
    }
}
