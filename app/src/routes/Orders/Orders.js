import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

//import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ orders, loading }) => ({
    orders,
    loading: loading.models.orders,
}))
export default class OrderView extends PureComponent {
    componentDidMount() {
        this.props.dispatch({
            type: 'orders/fetch',
            payload: {
                orderId: 2,
            },
        });
    }

    handleClick = (value) => {
        console.log(value);
        this.props.dispatch({
            type: 'orders/fetch',
            payload: {
                orderId: value,
            },
        });
        /* axios.get('http://localhost:3000/salesOrders?orderId=' + value).then(res => {
            const orderDetail = res.data;
            console.log(res.data)
            this.setState({ orderDetail });
        }); */


    }

    render() {
        const { orders: { orders }, loading } = this.props;
        console.log(orders.msg);

        const Info = ({ title, value, bordered }) => (
            <div >
                <span>{title}</span>
                <p>{value}</p>
                {bordered && <em />}
            </div>
        );

        const extraContent = (
            <div >
                <RadioGroup defaultValue="all">
                    <RadioButton value="all">全部</RadioButton>
                    <RadioButton value="progress">进行中</RadioButton>
                    <RadioButton value="waiting">等待中</RadioButton>
                </RadioGroup>
                <Search
                    
                    placeholder="请输入"
                    onSearch={() => ({})}
                />
            </div>
        );

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 5,
            total: 50,
        };

        const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
            <div >
                <div >
                    <span>Owner</span>
                    <p>{owner}</p>
                </div>
                <div >
                    <span>开始时间</span>
                    <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
                </div>
                <div >
                    <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
                </div>
            </div>
        );

        const menu = (
            <Menu>
                <Menu.Item>
                    <a>编辑</a>
                </Menu.Item>
                <Menu.Item>
                    <a>删除</a>
                </Menu.Item>
            </Menu>
        );

        const MoreBtn = () => (
            <Dropdown overlay={menu}>
                <a>
                    更多 <Icon type="down" />
                </a>
            </Dropdown>
        );

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
            

        return (
            <PageHeaderLayout action= { actionInputSearch}>
                <div >
                    <Card bordered={false}>
                        {console.log(orders.msg)}
                    </Card>

                    
                </div>
            </PageHeaderLayout>
        );
    }
}
