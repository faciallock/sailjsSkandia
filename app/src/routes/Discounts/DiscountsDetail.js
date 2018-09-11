import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { Collapse , Card, Alert, Tabs, Row, Col, Radio, Spin, Button, Icon, LocaleProvider } from 'antd';

import StandardTable from '../../components/StandardTable';

import PageHeader from '../../components/PageHeader';



import ModalDiscountCustomer from './ModalDiscountCustomer';
import SearchForm from './SearchForm';
import DiscountCustomerDetails from './DiscountCustomerDetails';
import DiscountSalesMargin from './DiscountSalesMargin';
import DiscountPromotionDetails from './DiscountPromotionDetails';
import DiscountsLTTable from './DiscountsLTTable';
import DiscountsPrevious from './DiscountsPrevious';




import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';



import moment from 'moment';


import { routerRedux } from 'dva/router';
import { IntlProvider,FormattedNumber } from 'react-intl';
import _ from 'lodash';




import PageHeaderLayout from '../../layouts/PageHeaderLayout';

//import styles from './BasicList.less';
import styles from './css/Orders.css';




const Panel = Collapse.Panel;


const breadcrumbTitle = [{
    title: '',
}];
@connect(({ discounts, discountDetail,loading, global }) => ({
    discounts,
    discountDetail:discounts.discountDetail,
    loading: loading.models.discounts,
    eye: global.eye
    

}))
export default class DiscountsDetail extends PureComponent {
    
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
        showSearch: true,
        visibleDiscountCustomer:false,
        visibleSurcharges:false,
        discountDetail:{},
        surchargesDetail:{},
        sortedInfo: null,
        firstEye: ""
    }

    getUrlParam=(param)=>{
        var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        else {
            return decodeURI(results[1]) || 0;
        }

    }
    componentDidMount() {

        console.log(this.getUrlParam('promoNo'));
        console.log(this.getUrlParam('promoSeqNo'));
        if(localStorage.getItem('userName') ===null){
            //routerRedux.push("");
            this.props.dispatch(routerRedux.push('/user/login'))
        }
        this.props.dispatch({
            type: 'discounts/fetchDetail',
            payload: {
                promoNo: this.getUrlParam('promoNo'),
                promoSeqNo:this.getUrlParam('promoSeqNo')
            },
        });


    }


    

    render() {
        console.log(this.props);
        const {  discountDetail, loading } = this.props;
        
        const { visibleSurcharges, visibleDiscountCustomer,  visibleNewComment, surchargesDetail,visibleBOM, visibleInventory } = this.state;
        let {sortedInfo }= this.state;
        //console.log(discountDetail.msg.LS_CUST_DET);
        const DiscountData= (typeof discountDetail.msg === 'undefined') ? "" : discountDetail.msg;
        //typeof payload.OrderNumber == "undefined" ?
        sortedInfo = sortedInfo || {};

        const columns = [
            {
                title: 'Promotion',
                dataIndex: 'PROMOTION',
                key: 'PROMOTION'          
            },{
                title: 'Action',
                key: 'operation',
                render: (text, record) => {
                       
                    
                    return (
                        <a onClick={() => this.showModal(record)} ><Icon type="eye-o" /> Show</a>
                    )
                }
            },
        ];
        
            
       
        return (
            <IntlProvider locale="en">
            <PageHeaderLayout 
                title="Promotion Discount Request"
                content={
                    <div style={{marginLeft:'1rem'}}>
                       

                        <Button 
                            onClick={()=>{
                                this.props.dispatch(routerRedux.push('/discounts/list'))
                            }} 
                            type="primary">
                            <Icon type="left" />Go back
                        </Button>
                    </div>}
                breadcrumbList={breadcrumbTitle} 
             >
                    

                    

                   
                    
                   
                    
                    
                    
                    <Card bordered={false}>
                        <LocaleProvider locale={en_US}>
                            <Spin spinning={this.props.loading}  tip="Loading promotion...">
                                
                            <Collapse defaultActiveKey={['1','2','3']} onChange={()=>{console.log("this")}}>
                                <Panel header={<span><Icon type="user" /> Customer details</span>} key="1">
                                    <DiscountCustomerDetails data={discountDetail} />
                                </Panel>
                                <Panel header={<span>% Sales margin</span>} key="2">
                                    <DiscountSalesMargin data={discountDetail}/>
                                </Panel>
                                <Panel header={<span><Icon type="profile" /> Promotion details</span>} key="3">
                                    <DiscountPromotionDetails data={discountDetail}/>
                                </Panel>
                                {
                                    discountDetail.LT_SHUTTERS &&
                                    <Panel header={<span><Icon type="bars" /> Shutters</span>} key="4">
                                        <DiscountsLTTable data={discountDetail.LT_SHUTTERS} />
                                        <DiscountsPrevious data={discountDetail.LS_SHUTTERS_PREV} />
                                    </Panel>

                                }
                                {
                                    discountDetail.LT_SHADES &&
                                    <Panel header={<span><Icon type="bars" /> Shades</span>} key="5">
                                        <DiscountsLTTable data={discountDetail.LT_SHADES} />
                                        <DiscountsPrevious data={discountDetail.LS_SHADES_PREV} />
                                    </Panel>

                                }
                                {
                                    discountDetail.LT_VERT &&
                                    <Panel header={<span><Icon type="bars" /> Verticals</span>} key="6">
                                        <DiscountsLTTable data={discountDetail.LT_VERT} />
                                        <DiscountsPrevious data={discountDetail.LS_VERT_PREV} />
                                    </Panel>

                                }
                                {
                                    discountDetail.LT_ALUM &&
                                    <Panel header={<span><Icon type="bars" /> Aluminum Blinds</span>} key="7">
                                        <DiscountsLTTable data={discountDetail.LT_ALUM} />
                                        <DiscountsPrevious data={discountDetail.LS_ALUM_PREV} />
                                        

                                    </Panel>

                                }
                                {
                                    discountDetail.LT_ROLLER_SHADES &&
                                    <Panel header={<span><Icon type="bars" /> Roller Shades</span>} key="8">
                                        <DiscountsLTTable data={discountDetail.LT_ROLLER_SHADES} />
                                        <DiscountsPrevious data={discountDetail.LS_ROLLER_SHADES_PREV} />
                                    </Panel>

                                }
                                {
                                    discountDetail.LT_WOVEN_WOODS &&
                                    <Panel header={<span><Icon type="bars" /> Woven Woods</span>} key="9">
                                        <DiscountsLTTable data={discountDetail.LT_WOVEN_WOODS} />
                                        <DiscountsPrevious data={discountDetail.LS_WOVEN_WOODS_PREV} />
                                    </Panel>

                                }
                                {
                                    discountDetail.LT_OTHERS &&
                                    <Panel header={<span><Icon type="bars" /> Others</span>} key="10">
                                        <DiscountsLTTable data={discountDetail.LT_OTHERS} />
                                        <DiscountsPrevious data={discountDetail.LS_OTHERS_PREV} />
                                        
                                    </Panel>

                                }
                                
                                
                                

                                
                                
                            </Collapse>
                                    
                            </Spin>
                            
                        </LocaleProvider>
                    </Card>


                    
                
            </PageHeaderLayout>
            </IntlProvider>
        );
    }
}
