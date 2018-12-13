import { Component } from 'react';
import { Form, Input, Row, Col, Card, Select } from 'antd';
const { Option } = Select;

const FormItem = Form.Item;

class OrderShippingForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            exShipTo:"",
            city:"",
            region:"",
            postCode:""

        };
    }

    showModelHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
        });
    };

    okHandler = () => {
        const { onOk } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values);
                this.hideModelHandler();
            }
        });
    };
    validateArray =data =>{
        return ""
    }

    componentWillMount(){
        
    }

    render() {
        /* const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, email, website } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }; */

        let data = [];
        if (JSON.stringify(this.props.data).length==2) {
            return <div></div>
        } else {
            data = this.props.data;
            console.log(data.EX_SHIP_TO);
            let exShipTo,city,region,postCode ="";
            var postCodeTemp;

            if (data.EX_SHIP_TO.length != 0) {

                /// extract correct ship to
                let itemShipTo = data.EX_SHIP_TO.find((itemShipTo) => { return itemShipTo.KUNNR == data.EX_SHIPTOID });

                exShipTo = itemShipTo.STREET;
                city = itemShipTo.CITY1;
                region = itemShipTo.REGION;
                postCodeTemp = itemShipTo.POST_CODE1;
                postCode = postCodeTemp.split("-")[0];
                
                data.EX_SHIP_TO=[];
                this.setState({ exShipTo, region, postCode, city });
            }
            
        }
        return (
            
                <Form style={{padding:"0px 25px"}} layout="vertical" hideRequiredMark>
                    <Row gutter={12}>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item   label="House No."
                            >

                                <label for=""></label>

                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item

                                label="Address 1"
                            >
                                
                                <label for=""><b>{this.state.exShipTo}</b></label>
                                

                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item
                                label="Address 2"
                            >
                                {
                                    <label ><b></b></label>
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="City">
                                <label><b>{ this.state.city }</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="State">
                                <label ><b>{this.state.region}</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Zip">
                                <label ><b>{this.state.postCode}</b></label>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Sidemark/PO">
                                <label ><b>{data.EX_SIDEMARK}</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={12} sm={24}>
                            <Form.Item label="Sales Org.">
                                <Select value="" value={data.EX_ORG} placeholder="" disabled={true}>
                                    <Option key={data.EX_ORG} value={data.EX_ORG}><b>{data.EX_ORG}</b></Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Production Rush" >
                                
                                <label ><b>{data.EX_PRODRUSH}</b></label>
                                
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Delivery">
                                <label ><b>{data.EX_DELIVERY}</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Reference">
                                <Input placeholder="" value={data.EX_REFERENCE} disabled={true}/>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Repair/Remake Code" >
                                <Select placeholder="" disabled={true}>
                                    <Option value="one">One option</Option>
                                    <Option value="second">Second option</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Packed Date">
                                <label ><b>{data.EX_PACKDATE}</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Batch Date">

                                <label ><b>{data.EX_BATCHDATE}</b></label>

                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Invoice Date">

                                <label ><b>{data.EX_INVDATE}</b></label>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Invoice Number">
                                <label ><b>{data.EX_INVNO.replace(/^0+/, '')}</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Order Weight">
                                <label ><b>{data.EX_ORDWEIGHT}</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={8} md={24} sm={24}>
                            <Form.Item label="Order Date">
                                <label ><b>{data.EX_ORDDATE}</b></label>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            
        );
    }
}

export default Form.create()(OrderShippingForm);