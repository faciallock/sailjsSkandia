import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../constants';
import UserModal from './UserModal';

function Users({ dispatch, list: dataSource, loading, total, page: current }) {
    function deleteHandler(id) {
        dispatch({
            type: 'users/remove',
            payload: id,
        });
    }
    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: { page },
        }));
    }

    function editHandler(id, values) {
        dispatch({
            type: 'users/patch',
            payload: { id, values },
        });
    }

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'userLastName',
            key: 'userLastName'
        },
        {
            title: 'First Name',
            dataIndex: 'userFirstName',
            key: 'userFirstName'
        },
        {
            title: 'Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'Enabled',
            dataIndex: 'enabled',
            key: 'enabled',
        },
        {
            title: 'Operation',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                    <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
                        <a>Edit</a>
                    </UserModal>
                    <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
                        <a href="">Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.create}>
                    <UserModal record={{}} onOk={createHandler}>
                        <Button type="primary">Create User</Button>
                    </UserModal>
                </div>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={dataSource}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className="ant-table-pagination"
                    current={current}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { list, total, page } = state.users;
    return {
        list,
        total,
        page,
        loading: state.loading.models.users,
    };
}

export default connect(mapStateToProps)(Users);