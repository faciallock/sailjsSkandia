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

import { getOrders, getOrderDetail } from '../services/api';

export default {
    namespace: 'orders',

    state: {
        orders: [],
        orderDetail:{}
    },

    effects: {
        *fetch({ payload }, { call, put }) {
            const response = yield call(getOrders, payload);
            yield put({
                type: 'queryOrders',
                payload:response,
            });
        },
        *fetchDetail({ payload }, { call, put }) {
            const response = yield call(getOrderDetail, payload);
            yield put({
                type: 'queryOrderDetail',
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
        }/* ,
        appendList(state, action) {
            return {
                ...state,
                list: state.list.concat(action.payload),
            };
        }, */
    },
};


