/*import * as orderService from '../services/api';
export default {
    namespace: 'orders',
    state: {
        list: [],
        total: null,
        page: null,
    },
    reducers: {
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page };
        },
    },
    effects: {
        *fetch({ payload: { orderId = 1 } }, { call, put }) {
            const { data, headers } = yield call(orderService.getOrderDetail, { orderId });
            yield put({
                type: 'save',
                payload: {
                    data
                },
            });
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/orders') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },
};*/

/* import { getOrderDetail } from '../services/api';
 */
/* export default {
    namespace: 'orders',

    state: {
        list: [],
    },

    effects: {
        *fetch(_, { call, put }) {
            const response = yield call(getOrderDetail);
            yield put({
                type: 'saveOrder',
                payload: Array.isArray(response) ? response : [],
            });
        },
    },

    reducers: {
        saveOrder(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
    },
};
 */

import { getOrders, getOrderDetail, getBOM, getInventory, addComment, getUserType, searchOrder } from '../services/api';

export default {
    namespace: 'orders',

    state: {
        orders: [],
        orderDetail:{},
        userRoles:{},
        bomDetail:{},
        inventoryDetail:{}

    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getOrders, payload);
            yield put({
                type: 'queryOrders',
                payload:response,
            });
        },

        *search({ payload }, { call, put }) {
            const response = yield call(searchOrder, payload);
            yield put({
                type: 'queryOrders',
                payload:response,
            });
        },
        
        *addComment({ payload }, { call, put }) {
            const response = yield call(addComment, payload);


            const responseFetch = yield call(getOrderDetail, payload);
            yield put({
                type: 'queryOrderDetail',
                payload: responseFetch,
            });
        },
        *getUserType({ payload }, { call, put }) {
            const response = yield call(getUserType, payload);
            yield put({
                type: 'queryUserType',
                payload: response,
            });
        },
        *fetchDetail({ payload }, { call, put }) {

            const response = yield call(getOrderDetail, payload);
            yield put({
                type: 'queryOrderDetail',
                payload: response,
            });
            
        },
        *fetchBOM({ payload }, { call, put }) {

            const response = yield call(getBOM, payload);
            yield put({
                type: 'queryBOM',
                payload: response,
            });

        },
        *fetchInventory({ payload }, { call, put }) {

            const response = yield call(getInventory, payload);
            yield put({
                type: 'queryInventory',
                payload: response,
            });

        }
        
        
    },

    reducers: {
        queryOrders(state, action) {
            return {
                ...state,
                orders: action.payload.msg.EX_ORDHDR,
                orderDetail: { }
            };
        },
        queryOrderDetail(state, action) {
            return {
                ...state,
                orderDetail: action.payload.msg
            };
        },
        queryBOM(state, action) {
            return {
                ...state,
                bomDetail: action.payload.msg
            };
        },
        queryInventory(state, action) {
            return {
                ...state,
                inventoryDetail: action.payload.msg
            };
        },
        
        
        queryUserType(state, action) {
            return {
                ...state,
                userRoles: action.payload.data
            };
        }/* ,
        appendList(state, action) {
            return {
                ...state,
                list: state.list.concat(action.payload),
            };
        }, */
    },
};


