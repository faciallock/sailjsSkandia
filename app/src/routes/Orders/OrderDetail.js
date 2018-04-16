import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Table, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';
import StandardTable from '../../components/StandardTable';
import { div } from 'gl-matrix/src/gl-matrix/vec3';


//import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;


export default class OrderDetail extends PureComponent {

    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
        visible: false,
        currentOrder: 0
    }
    componentDidMount() {
       
    }

    render() {
        if (this.props.data === undefined) {
            return <div>No Data ...</div>
        }
        return (
            <div>{this.props.data.IM_SALESDOCU}</div>
        );
    }
}
