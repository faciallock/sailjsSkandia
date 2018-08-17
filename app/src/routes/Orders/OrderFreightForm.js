import { Component } from 'react';
import { Form, Input, Row, Col, Card, Select } from 'antd';
import moment from 'moment';
const { Option } = Select;

const FormItem = Form.Item;

class OrderFreightForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
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

    render() {
        /* const { children } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { name, email, website } = this.props.record;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        }; */

        let data = [];
        if (JSON.stringify(this.props.data).length == 2) {
            return <div></div>
        } else {
            data = this.props.data;
        }
        return (
            
            <Form style={{ padding: "0px 25px" }} layout="vertical" hideRequiredMark>
                    <Row gutter={12}>
                        <Col lg={24} md={24} sm={24}>
                            <Form.Item label="Shippers Instruction">
                                
                                    <Input
                                        placeholder="" defaultValue={""} disabled={true}
                                    />
                                
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={24} sm={24}>
                            <Form.Item label="Tracking Number">
                                <label ><b>{data.EX_TRACKNO}</b></label>
                            </Form.Item>
                        </Col>
                        <Col lg={12} md={24} sm={24}>
                            <Form.Item label="No. of Packages">
                                
                                <label ><b>{data.EX_NOPACK}</b></label>
                                
                            </Form.Item>
                        </Col>
                        

                    </Row>
                    <Row gutter={16}>
                        <Col lg={12} md={24} sm={24}>
                            <Form.Item label="Shipment Date">

                                <label ><b>{ data && data.EX_SHDATE && data.EX_SHDATE != "00000000" ? moment(data.EX_SHDATE).format("MM/DD/YYYY"): "" }</b></label>

                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={24}>
                            <Form.Item label="Freight">

                                <Select placeholder="" value={data.EX_FREIGHT} disabled={true} >
                                    <Option value={data.EX_FREIGHT}><b>{data.EX_FREIGHT}</b></Option>

                                </Select>
                            </Form.Item>
                        </Col>
                        
                    </Row>
                    <Row gutter={16}>
                        <Col lg={12} md={12} sm={24}>
                            <Form.Item label="Freight Override">

                                <Select placeholder="" value={data.EX_FROVER} disabled={true}>
                                    <Option value={data.EX_FREIGHT}><b>{data.EX_FREIGHT}</b></Option>
                                </Select>

                            </Form.Item>
                        </Col>
                        <Col lg={12} md={12} sm={24}>
                            <Form.Item label="Freight Cost">

                                <label ><b>{data.EX_FREIGHTCOST}</b></label>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            
        );
    }
}

export default Form.create()(OrderFreightForm);