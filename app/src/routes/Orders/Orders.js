import React, { PureComponent } from 'react';

import { connect } from 'dva';
import { List, Table, Form, Divider, Card, Alert, Tabs, Row, Col, Spin, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal, LocaleProvider } from 'antd';

import StandardTable from '../../components/StandardTable';

import PageHeader from '../../components/PageHeader';
import OrderDetail from './OrderDetail';

import OrderShippingForm from './OrderShippingForm';
import OrderFreightForm from './OrderFreightForm';
import ViewOrderTable from './ViewOrderTable';
import ModalNewComment from './ModalNewComment';
import ModalBOM from './ModalBOM';
import ModalDiscount from './ModalDiscount';
import ModalSurcharges from './ModalSurcharges';


import ModalInventory from './ModalInventory';
import SearchForm from './SearchForm';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-au';

import { OrderTypes } from './map/OrderTypes';

import moment from 'moment';


import { routerRedux } from 'dva/router';
import { IntlProvider, FormattedNumber } from 'react-intl';
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
@connect(({ orders, orderDetail, loading, global }) => ({
    orders,
    orderDetail: orders.orderDetail,
    userRoles: orders.userRoles,
    bomDetail: orders.bomDetail,
    inventoryDetail: orders.inventoryDetail,
    loading: loading.models.orders,
    eye: global.eye


}))
export default class OrderView extends PureComponent {

    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
        visible: false,
        currentRecord: {},
        visibleNewComment: false,
        visibleBOM: false,
        visibleInventory: false,
        showSearch: true,
        visibleDiscount: false,
        visibleSurcharges: false,
        discountDetail: {},
        surchargesDetail: {},
        sortedInfo: null,
        firstEye: ""
    }
    componentDidMount() {
        if (localStorage.getItem('userName') === null) {
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

    onBomClick = (orderId, lineItemNumber) => {
        console.log({ orderId });
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

    onBestDiscountClick = (data) => {
        console.log(data);
        //discountDetail

        this.setState({
            discountDetail: data,
            visibleDiscount: true
        });
    }

    onSurchargesClick = (data) => {
        console.log(data);
        //discountDetail

        this.setState({
            surchargesDetail: data,
            visibleSurcharges: true
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
    formatCommentDate = (date, time) => {

        let dateJS = new Date(parseInt(date.substring(0, 4)), parseInt(date.substring(4, 6)) - 1, parseInt(date.substring(6, 8)), parseInt(time.substring(0, 2)) - 1, parseInt(time.substring(2, 4)), parseInt(time.substring(4, 6)))  //date+time;
        console.log(moment(dateJS).format("YYYY-MM-DD HH:mm:ss"));
        return moment(moment(dateJS).format("YYYY-MM-DD HH:mm:ss"), "YYYY-MM-DD HH:mm:ss").fromNow();

    }
    reverseComments = (items) => {
        if (items) {
            return items.reverse();
        }
        else {
            return []
        }




    }
    showModal = (record, orderDetail) => {
        this.openDetail(record.VBELN);
        this.setState({
            currentRecord: record,
        });



    }

    openDetail = vbeln => {
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
        this.setState({ visibleNewComment: true })

    }
    onCancelNewComment = () => {
        this.setState({ visibleNewComment: false })
    }
    onOKBOM = () => {
        this.setState({ visibleBOM: false })
    }
    onOKDiscount = () => {
        this.setState({ visibleDiscount: false })
    }
    onOKSurcharges = () => {
        this.setState({ visibleSurcharges: false })
    }
    onOKInventory = () => {
        this.setState({ visibleInventory: false })
    }

    handleOkNewComment = (documentId) => {
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


    handleSearch = (payload) => {
        console.log(payload);


        //payload.UserName = localStorage.getItem('userName');
        payload.UserName = localStorage.getItem('userName'),
            payload.UserIndicator = localStorage.getItem('userType'),
            payload.DealerNumber = "";


        if (typeof payload.OrderNumber == "undefined") { payload.OrderNumber = ""; };
        if (typeof payload.Sidemark == "undefined") { payload.Sidemark = ""; };
        if (typeof payload.CustomerNumber == "undefined") { payload.CustomerNumber = ""; };
        if (typeof payload.Name == "undefined") { payload.Name = ""; };
        if (typeof payload.OrderDate == "undefined" || payload.OrderDate == null) { payload.OrderDate = ""; };
        if (typeof payload.OrderDateTo == "undefined" || payload.OrderDateTo == null) { payload.OrderDateTo = ""; };
        if (typeof payload.ShippedDate == "undefined" || payload.ShippedDate == null) { payload.ShippedDate = ""; };
        if (typeof payload.ShippedDateTo == "undefined" || payload.ShippedDateTo == null) { payload.ShippedDateTo = ""; };
        if (typeof payload.ShippedBy == "undefined") { payload.ShippedBy = ""; };
        if (typeof payload.TotalPrice == "undefined") { payload.TotalPrice = ""; };
        if (typeof payload.Status == "undefined") { payload.Status = ""; };

        if (payload.OrderNumber != "") { payload.OrderNumber = payload.OrderNumber.padStart(10, '0'); };
        if (payload.CustomerNumber != "") { payload.CustomerNumber = payload.CustomerNumber.padStart(10, '0'); };

        if (payload.OrderDate != "") { payload.OrderDate = payload.OrderDate.format("YYYYMMDD"); };
        if (payload.ShippedDate != "") {

            payload.ShippedDate = payload.ShippedDate.format("YYYYMMDD");
            this.setState({
                ShippedDate: payload.ShippedDate
            })

        };

        if (payload.OrderDateTo != "") { payload.OrderDateTo = payload.OrderDateTo.format("YYYYMMDD"); };
        if (payload.ShippedDateTo != "") {
            payload.ShippedDateTo = payload.ShippedDateTo.format("YYYYMMDD");
            this.setState({
                ShippedDateTo: payload.ShippedDateTo
            })

        };

        if (payload.OrderDate == "" && payload.OrderDateTo != "") { payload.OrderDate = payload.OrderDateTo };
        if (payload.OrderDate != "" && payload.OrderDateTo == "") { payload.OrderDateTo = payload.OrderDate };

        if (payload.ShippedDate == "" && payload.ShippedDateTo != "") { payload.ShippedDate = payload.ShippedDateTo };
        if (payload.ShippedDate != "" && payload.ShippedDateTo == "") { payload.ShippedDateTo = payload.ShippedDate };



        this.props.dispatch({
            type: 'orders/search',
            payload: payload,
        });
    }


    getSHCharges = (ZF00) => {

        var ZF00rray = ZF00.map((item) => { return item.COND_VAL });
        console.log(ZF00rray)
        var ZF00sum = 0;

        ZF00rray.forEach(element => {
            ZF00sum = ZF00sum + parseFloat(element);
        });
        return ZF00sum;// "$"+parseFloat(Math.round(ZCODsum * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

    }

    getCODCharges = (ZCOD) => {

        var ZCODrray = ZCOD.map((item) => { return item.COND_VAL });
        console.log(ZCODrray)
        var ZCODsum = 0;

        ZCODrray.forEach(element => {
            ZCODsum = ZCODsum + parseFloat(element);
        });
        return ZCODsum;// "$"+parseFloat(Math.round(ZCODsum * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

    }



    getGrandTotal = (total, taxes) => {

        return total + taxes;



    }
    sumTaxes = (JR1, JR2, JR3, JR4) => {


        var jr1array = JR1.map((item) => { return item.COND_VAL });
        var jr2array = JR2.map((item) => { return item.COND_VAL });
        var jr3array = JR3.map((item) => { return item.COND_VAL });
        var jr4array = JR4.map((item) => { return item.COND_VAL });
        var jr1sum = 0;
        var jr2sum = 0;
        var jr3sum = 0;
        var jr4sum = 0;
        jr1array.forEach(element => {
            jr1sum = jr1sum + parseFloat(element);
        });
        jr2array.forEach(element => {
            jr2sum = jr2sum + parseFloat(element);
        });
        jr3array.forEach(element => {
            jr3sum = jr3sum + parseFloat(element);
        });
        jr4array.forEach(element => {
            jr4sum = jr4sum + parseFloat(element);
        });



        /*  jr1Val=(typeof JR1[0] === 'undefined') ? 0 :  parseFloat(Math.round(JR1[0].COND_VAL * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
         jr2Val=(typeof JR2[0] === 'undefined') ? 0 :  parseFloat(Math.round(JR2[0].COND_VAL * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
         jr3Val=(typeof JR3[0] === 'undefined') ? 0 :  parseFloat(Math.round(JR3[0].COND_VAL * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
         jr4Val=(typeof JR4[0] === 'undefined') ? 0 :  parseFloat(Math.round(JR4[0].COND_VAL * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); */

        return parseFloat(jr1sum) + parseFloat(jr2sum) + parseFloat(jr3sum) + parseFloat(jr4sum);

        //  return parseFloat(Math.round((total+taxes) * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g);





    }

    //(typeof JR1[0] === 'undefined') ? false : "$"+parseFloat(Math.round(JR1[0].COND_VAL * 100)/ 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')  

    toggleSearch = () => {

        this.setState({
            showSearch: !this.state.showSearch,
        });


    }

    renderFields = (userType, orderDetail, ZF00, ZCOD, JR1, JR2, JR3, JR4) => {
        return (
            <div>
                {
                    userType == 'D' &&
                    <div>
                        <Row gutter={12}>
                            <Col lg={8} md={8} sm={12}>
                                <b>Payment Terms:</b> {orderDetail.EX_BILL_TERM ? orderDetail.EX_BILL_TERM.VALUE : ""}
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>Rush Charges Cat.:</b> {orderDetail.EX_PRODRUSH ? orderDetail.EX_PRODRUSH.split("-")[1] : ""}
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>S/H Charges:</b> {(typeof ZF00[0] === 'undefined') ? false : "$" + parseFloat(Math.round(ZF00[0].COND_VAL * 100) / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                            </Col>
                            {/*  {localStorage.getItem('userType') != "D" &&<Col lg={8} md={8} sm={12}>
                                <b>Created By:</b> {orderDetail.EX_CSR}
                            </Col> &&
                            <Col lg={8} md={8} sm={12}>
                                <b>Last Modified By:</b> {orderDetail.EX_LASTCHANGE}
                            </Col>} */}
                        </Row>
                        {/* <Row gutter={12}> */}
                        {/* {localStorage.getItem('userType') != "D" && 
                            <Col lg={8} md={8} sm={12}>
                                <b>Net Value:</b> <FormattedNumber style="currency" currency="USD"  value= {orderDetail.EX_NETVAL}/> 
                            </Col> } */}

                        {/* </Row> */}
                        <Row gutter={12}>
                            <Col lg={8} md={8} sm={12}>
                                <b>COD Charges:</b> <FormattedNumber style="currency" currency="USD" value={this.getCODCharges(ZCOD)} />

                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>Taxes:</b> {this.sumTaxes(JR1, JR2, JR3, JR4)}
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>Grand Total:</b><div style={{ color: "#e24c02" }}><FormattedNumber style="currency" currency="USD" value={this.getGrandTotal(parseFloat(Math.round(orderDetail.EX_NETVAL * 100) / 100), this.sumTaxes(JR1, JR2, JR3, JR4))} /> </div>
                            </Col>
                        </Row>
                    </div>
                }
                {
                    userType !== 'D' &&
                    <div>
                        <Row gutter={12}>
                            <Col lg={8} md={8} sm={12}>
                                <b>Payment Terms:</b> {orderDetail.EX_BILL_TERM ? orderDetail.EX_BILL_TERM.VALUE : ""}
                            </Col>


                            <Col lg={8} md={8} sm={12}>

                                <b>Created By:</b> {orderDetail.EX_CSR}
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>Last Modified By:</b> {orderDetail.EX_LASTCHANGE}
                            </Col>
                        </Row>
                        <Row gutter={12}>

                            <Col lg={8} md={8} sm={12}>
                                <b>Net Value:</b> <FormattedNumber style="currency" currency="USD" value={orderDetail.EX_NETVAL} />
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>Rush Charges Cat.:</b> {orderDetail.EX_PRODRUSH ? orderDetail.EX_PRODRUSH.split("-")[1] : ""}
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>S/H Charges:</b> <FormattedNumber style="currency" currency="USD" value={this.getSHCharges(ZF00)} />

                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col lg={8} md={8} sm={12}>
                                <b>COD Charges:</b> <FormattedNumber style="currency" currency="USD" value={this.getCODCharges(ZCOD)} />
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>Taxes:</b> ${this.sumTaxes(JR1, JR2, JR3, JR4)}
                            </Col>
                            <Col lg={8} md={8} sm={12}>
                                <b>Grand Total:</b><div style={{ color: "#e24c02" }}><FormattedNumber style="currency" currency="USD" value={this.getGrandTotal(parseFloat(Math.round(orderDetail.EX_NETVAL * 100) / 100), this.sumTaxes(JR1, JR2, JR3, JR4))} /> </div>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        );
    }




    handleClick = (value) => {
        this.openDetail(value);


    }

    reviewOrderList(valuesOrderList) {

        let newList = valuesOrderList.filter((item) => {

            if (item.WADAT_IST !== "00000000") {

                if (item.ShippedDate === item.WADAT_IST) {
                    return item
                }

            }
            // if(item.)
            // console.log(item.WADAT_IST)
        })

        if (newList.length > 0) {
            return newList
        }


    }

    render() {
        console.log(this.props);
        const { orders: { orders }, orderDetail, bomDetail, inventoryDetail, userRoles, loading } = this.props;
        console.log(userRoles);
        const { visibleSurcharges, visibleDiscount, visibleNewComment, discountDetail, surchargesDetail, visibleBOM, visibleInventory } = this.state;
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};


        let orderList = "";


        if (this.state.ShippedDate && this.state.ShippedDateTo) {
            let ShippedDate = this.state.ShippedDate
            let ShippedDateTo = this.state.ShippedDateTo
            orderList = orders.filter((item) => {
                if (item.WADAT_IST !== "00000000") {
                    if (ShippedDate === item.WADAT_IST || ShippedDateTo === item.WADAT_IST) {
                        return item
                    }
                }
            })
        } else {
            orderList = orders
        }



        if (localStorage.getItem('userType') != "D") {






            var columns = [
                {
                    title: 'Order No',
                    dataIndex: 'VBELN',
                    key: 'VBELN',
                    fixed: 'left',
                    width: 80,
                    render: (text, record) => {

                        let value = text.replace(/^0+/, '');
                        return (
                            <span>{value}</span>
                        )
                    }
                },
                {
                    title: 'Sidemark/PO',
                    dataIndex: 'BSTNK',
                    key: 'BSTNK'
                },
                {
                    title: 'Credits Issued',
                    dataIndex: 'VBTYP',
                    key: 'VBTYP',
                    render: (text, record) => {
                        let value = "";

                        // if (text !== "") {
                        //     console.log("no empty value ")
                        // }
                        switch (text) {
                            case "A":
                                value = "Inquiry";
                                break;
                            case "B":
                                value = "Quotation";
                                break;
                            case "C":
                                value = "Order";
                                break;
                            case "D":
                                value = "Item proposal";
                                break;
                            case "E":
                                value = "Scheduling agreement";
                                break;
                            case "F":
                                value = "Scheduling agreement with external servic";
                                break;
                            case "G":
                                value = "Contrast";
                                break;
                            case "H":
                                value = "Returns";
                                break;
                            case "I":
                                value = "Order w/o charge";
                                break;
                            case "K":
                                value = "Credit memo request";
                                break;
                            case "L":
                                value = "Debit memo request";
                                break;
                            case "W":
                                value = "Independents reqts plan";
                                break;
                            case "0":
                                value = "Master contact";
                                break;
                            default:
                                break;
                        }
                        return (
                            <span>{value}</span>
                        )
                    }
                },
                {
                    title: 'Cust No',
                    dataIndex: 'KUNNR',
                    key: 'KUNNR',
                    render: (text, record) => {

                        let value = text.replace(/^0+/, '');
                        return (
                            <span>{value}</span>
                        )
                    }
                },
                {
                    title: 'Order Date',
                    dataIndex: 'ERDAT',
                    key: 'ERDAT',
                    render: (text, record) => {

                        return (
                            <span>{moment(text).format("MM/DD/YYYY")}</span>
                        )
                    }

                },
                {
                    title: 'Shipped Date',
                    dataIndex: 'WADAT_IST',
                    key: 'WADAT_IST',
                    render: (text, record) => {

                        return (
                            <span>{text !== "00000000" ? moment(text).format("MM/DD/YYYY") : ""}</span>
                        )
                    }

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
                    sortOrder: sortedInfo.columnKey === 'DESC' && sortedInfo.order,
                    render: (text, record) => {

                        let value = text.replace(/^Skandia+/, '');


                        return (
                            <span>{value.substring(0, value.length - 3)}</span>
                        )
                    }
                },
                {
                    title: 'Total Price',
                    dataIndex: 'GRAND_TOTAL',
                    key: 'GRAND_TOTAL',
                    render: (record) => {
                        let currentTotalPrice = record !== "" ? "$" + parseFloat(record).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : "";
                        return (
                            <span>{currentTotalPrice}</span>
                        )
                    }
                },
                {
                    title: 'Status',
                    dataIndex: 'IND',
                    key: 'IND',
                    render: (text, record) => {

                        let value = text === 'Y' ? "Pending" : text === 'B' ? "In Production" : text === 'C' ? "In Production" : text === 'E' ? "Shipped" : text === 'F' ? "Shipped" : text === 'H' ? "Invoiced" : text === 'I' ? "Invoiced" : "Pending";


                        return (
                            <span>{value}</span>
                        )
                    }
                }, {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 125,
                    render: (text, record) => {


                        return (
                            <div>
                                <a onClick={() => this.showModal(record, orderDetail)} className={"tour_eye_" + record.VBELN}><Icon type="eye-o" /> Show</a>&nbsp;
                        <a href={'/api/print?orderId=' + record.VBELN} className={"tour_eye_" + record.VBELN}><Icon type="printer" /> Print</a>
                            </div>
                        )
                    }
                },
            ];


        } else {

            var columns = [
                {
                    title: 'Order No',
                    dataIndex: 'VBELN',
                    key: 'VBELN',
                    fixed: 'left',
                    width: 80,
                    render: (text, record) => {

                        let value = text.replace(/^0+/, '');
                        return (
                            <span>{value}</span>
                        )
                    }
                },
                {
                    title: 'Sidemark/PO',
                    dataIndex: 'BSTNK',
                    key: 'BSTNK'
                },
                {
                    title: 'Credits Issued',
                    dataIndex: 'VBTYP',
                    key: 'VBTYP',
                    render: (text, record) => {
                        let value = "";

                        if (text !== "") {
                            console.log("no empty value ")
                        }
                        switch (text) {
                            case "A":
                                value = "Inquiry";
                                break;
                            case "B":
                                value = "Quotation";
                                break;
                            case "C":
                                value = "Order";
                                break;
                            case "D":
                                value = "Item proposal";
                                break;
                            case "E":
                                value = "Scheduling agreement";
                                break;
                            case "F":
                                value = "Scheduling agreement with external servic";
                                break;
                            case "G":
                                value = "Contrast";
                                break;
                            case "H":
                                value = "Returns";
                                break;
                            case "I":
                                value = "Order w/o charge";
                                break;
                            case "K":
                                value = "Credit memo request";
                                break;
                            case "L":
                                value = "Debit memo request";
                                break;
                            case "W":
                                value = "Independents reqts plan";
                                break;
                            case "0":
                                value = "Master contact";
                                break;
                            default:
                                value = text;
                                break;
                        }
                        return (
                            <span>{value}</span>
                        )
                    }
                },
                {
                    title: 'Date',
                    dataIndex: 'ERDAT',
                    key: 'ERDAT',
                    render: (text, record) => {

                        return (
                            <span>{moment(text).format("MM/DD/YYYY")}</span>
                        )
                    }

                },
                {
                    title: 'Shipped Date',
                    dataIndex: 'WADAT_IST',
                    key: 'WADAT_IST',
                    render: (text, record) => {

                        return (
                            <span>{text !== "00000000" ? moment(text).format("MM/DD/YYYY") : ""}</span>
                        )
                    }

                },
                {
                    title: 'Product',
                    dataIndex: 'DESC',
                    key: 'DESC',
                    sorter: true,
                    render: (text, record) => {

                        let value = text.replace(/^Skandia+/, '');
                        return (
                            <span>{value}</span>
                        )
                    }
                },
                {
                    title: 'Status',
                    dataIndex: 'IND',
                    key: 'IND',
                    render: (text, record) => {

                        let value = text === 'C' ? "Confirmed" : "Pending";

                        return (
                            <span>{value}</span>
                        )
                    }
                }, {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 125,
                    render: (text, record) => {

                        return (
                            <div>
                                <a onClick={() => this.showModal(record, orderDetail)}><Icon type="eye-o" /> Show</a> &nbsp;
                        <a href={'/api/print?orderId=' + record.VBELN} className={"tour_eye_" + record.VBELN}><Icon type="printer" /> Print</a>
                            </div>
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
        let ZF00 = [{ COND_VAL: "" }], ZCOD = [{ COND_VAL: "" }], JR1 = [{ COND_VAL: "" }], JR2 = [{ COND_VAL: "" }], JR3 = [{ COND_VAL: "" }], JR4 = [{ COND_VAL: "" }];;


        if (orderDetail.EX_CONDITIONS !== undefined) {
            ZF00 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "ZF00" });
            ZCOD = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "ZCOD" });
            JR1 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "JR1" });
            JR2 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "JR2" });
            JR3 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "JR3" });
            JR4 = _.filter(orderDetail.EX_CONDITIONS, { COND_TYP: "JR4" });
        }

        /* let commonData = CommonDataManager.getInstance();
        let roles = commonData.getRoles(); */
        //console.log(roles);



        return (
            <IntlProvider locale="en">
                <PageHeaderLayout title=""
                    content={
                        <div style={{ textAlign: "right", position: 'relative', top: '-20px' }}>
                            <Button style={{ marginLeft: 8 }} onClick={this.toggleSearch} className="tour_button_hideSearch"><Icon type="search" style={{ color: '#1d2d5c' }} />
                                Hide search <Icon type={this.state.showSearch ? 'up' : 'down'} />
                            </Button>
                            {this.state.showSearch &&
                                <SearchForm handleSearch={this.handleSearch} />}
                        </div>}
                    breadcrumbList={breadcrumbTitle}
                >
                    <ModalNewComment
                        wrappedComponentRef={this.saveFormRefComment}
                        visible={visibleNewComment}
                        onCancel={this.onCancelNewComment}
                        onCreate={() => {
                            this.handleOkNewComment(orderDetail.IM_SALESDOCU.replace(/^0+/, ''))
                        }}
                    />
                    <ModalBOM
                        visible={visibleBOM}
                        onOK={this.onOKBOM}
                        data={bomDetail}
                        loading={loading}
                    />

                    <ModalDiscount
                        visible={visibleDiscount}
                        onOK={this.onOKDiscount}
                        data={discountDetail}
                        loading={loading}
                    />


                    <ModalSurcharges
                        visible={visibleSurcharges}
                        onOK={this.onOKSurcharges}
                        data={surchargesDetail}
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
                        onCancel={this.hideModal}
                        footer={[
                            <Button key="submit" onClick={this.hideModal}>
                                <Icon type="close" /> Close
                            </Button>,
                        ]}
                        width='90%'
                    >
                        <Spin size="large" spinning={loading} tip="Loading order detail..." >
                            <PageHeader
                                style={{ padding: '1px' }}
                                title={<div className="title">{orderDetail.IM_SALESDOCU ? orderDetail.IM_SALESDOCU.replace(/^0+/, '') : ""}</div>}
                                action={
                                    <div style={{ textAlign: 'left', paddingLeft: '30px', position: 'relative', top: '-5px' }}>


                                        <Row>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Company:</b> {orderDetail.EX_CUST ? orderDetail.EX_CUST.split("-")[1] : ""}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Account:</b> {orderDetail.EX_CUST ? orderDetail.EX_CUST.split("-")[0].replace(/^0+/, '') : ""}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Sales Org:</b> {orderDetail.EX_ORG}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Order Type:</b> {OrderTypes.types().getRequest(orderDetail.EX_DOCTYP)}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Order Status:</b> {orderDetail.EX_IND == 'C' ? 'Confirmed' : 'Pending'}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                                {localStorage.getItem('userType') !== "D" &&
                                                    <span><b>Order Status #2:</b> {orderDetail.EX_ORDSTATUS}</span>
                                                }
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={8} md={12} sm={24}>
                                                <b>Sales Territory:</b> {orderDetail.EX_VKGRP}
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                            </Col>
                                            <Col lg={8} md={12} sm={24}>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                                breadcrumbList={breadcrumbList}
                                logo={<Icon style={{ fontSize: 48, color: '#1d2d5c' }} type="file-text" />}
                                content={<div className="content">
                                    <Divider style={{ margin: '12px 0', top: '-12px' }} />

                                    {this.renderFields(localStorage.getItem('userType'), orderDetail, ZF00, ZCOD, JR1, JR2, JR3, JR4)}



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
                                    <LocaleProvider locale={en_US}>
                                        <ViewOrderTable onBestDiscountClick={this.onBestDiscountClick} onSurchargesClick={this.onSurchargesClick} data={orderDetail} onBomClick={this.onBomClick} onInventoryClick={this.onInventoryClick} />
                                    </LocaleProvider>
                                </TabPane>
                                <TabPane tab={<span><Icon type="solution" /> Shipping Information</span>} key="2">
                                    <OrderShippingForm data={orderDetail} />
                                </TabPane>
                                <TabPane tab={<span><Icon type="inbox" />Freight</span>} key="3">
                                    <OrderFreightForm data={orderDetail} />
                                </TabPane>
                                {localStorage.getItem('userType') != "D" && <TabPane tab={<span><Icon type="message" />Comments</span>} key="4">
                                    <Row gutter={12}>
                                        <Col lg={24} md={24} sm={24} style={{ textAlign: 'right', padding: '6px' }}>
                                            {localStorage.getItem('userType') != "S" && localStorage.getItem('userType') != "D" && <Button
                                                onClick={this.openModalComment}
                                                type="primary"><Icon type="message" /> Add comment</Button>}

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
                                                        locale={{ emptyText: 'No comments available' }}
                                                        dataSource={orderDetail.EX_USERLOG}
                                                        renderItem={item => (

                                                            <List.Item
                                                                actions={[
                                                                    <span style={{ color: '#1d2d5c', fontSize: '0.8rem' }}>

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




                                </TabPane>}
                            </Tabs>


                        </Spin>

                    </Modal>



                    <Card bordered={false}>
                        <LocaleProvider locale={en_US}>
                            <Table className="world"
                                loading={loading}
                                dataSource={orderList}
                                // dataSource={orders}
                                columns={columns}
                                size="small"
                                scroll={{ x: 1400 }}
                                rowKey={record => record.VBELN}
                                pagination={{ pageSize: 15 }}
                            />
                        </LocaleProvider>
                    </Card>




                </PageHeaderLayout>
            </IntlProvider>
        );
    }
}
