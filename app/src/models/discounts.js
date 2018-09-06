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

import { getOrderDetail, getDiscountListByName, getDiscountList, getDiscountDetails} from '../services/api';

export default {
    namespace: 'discounts',

    state: {
        discounts: [],
        nameDiscounts:[],
        discountDetail:{},
        userRoles:{},
        bomDetail:{},
        inventoryDetail:{}

    },

    effects: {
        

        
       
      
        *fetchDiscountList({ payload }, { call, put }) {

            const response = yield call(getDiscountList, payload);
            yield put({
                type: 'queryDiscountList',
                payload: response,
            });
            
        },
        *fetchDiscountListByName({ payload }, { call, put }) {

            const response = yield call(getDiscountListByName, payload);
            yield put({
                type: 'queryDiscountListByName',
                payload: response,
            });
            
        },
        
        *fetchDetail({ payload }, { call, put }) {

            const response = yield call(getDiscountDetails, payload);
            yield put({
                type: 'queryDiscountDetail',
                payload: response,
            });
            
        }
        
        
    },

    reducers: {
        queryDiscountDetail(state, action) {
            return {
                ...state,
                discountDetail: action.payload.msg
            };
        },
        queryDiscountList(state, action) {
            return {
                ...state,
                discounts: action.payload.msg.OUTPUT_LIST
            };
        },
        queryDiscountListByName(state, action) {
            return {
                ...state,
                nameDiscounts: action.payload.msg.OUTPUT_LIST
            };
        }
    },
};


