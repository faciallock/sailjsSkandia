import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Table, Card, Tabs, Row, Col, Spin, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';
import StandardTable from '../../components/StandardTable';


import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import logo from './logo_skandia_wf_h2.png';
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


export default class Home extends PureComponent {

   
    componentDidMount() {
       
    }
    render() {
        
        return (

            <PageHeaderLayout title="Home"  >
                <div style={{'text-align':'center',padding:"4em"}} >
                    

                    <img src={logo}/>


                </div>
            </PageHeaderLayout>
        );
    }
}
