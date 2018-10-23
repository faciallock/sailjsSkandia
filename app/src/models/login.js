import { routerRedux } from 'dva/router';
import { fakeAccountLogin, dealerSSO } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
/* import { CommonDataManager } from '../utils/CommonDataManager'; */

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      console.log(response);
      if(typeof response==='undefined'){
        //reloadAuthorized();
        //routerRedux.push('/')
        yield put(routerRedux.push('/orders'));
      }else if (response.token.length !==0) {
        console.log(response.token.length)
        localStorage.setItem('userName', response.msg.USER_ID);
        localStorage.setItem('userType', response.msg.USER_TYPE);
        localStorage.setItem('customerNumber', response.msg.CUSTOMER);
        
        
        //localStorage.setItem('roles', response.roles);
        /* var commonData = CommonDataManager.getInstance();
        commonData.setRoles(response.roles); */

        reloadAuthorized();
        //routerRedux.push('/')
        yield put(routerRedux.push('/orders'));
      }
    },
    *dealerSSO({ payload }, { call, put }) {
      const response = yield call(dealerSSO, payload);
      console.log(payload);
     /*  yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); */
      // Login successfully
      console.log(response);
      console.log(payload.payload.redirect)
      if(typeof response==='undefined'){
        //reloadAuthorized();
        //routerRedux.push('/')

        if(payload.payload.redirect){
          yield put(routerRedux.push(payload.payload.redirect));
        }
        else{
          yield put(routerRedux.push('/orders'));
        }
        
      }else if (response.token.length !==0) {
        //console.log(response.token.length)
        localStorage.removeItem('userName');
        localStorage.removeItem('antd-pro-authority');
        localStorage.removeItem('userType');
        localStorage.setItem('userName', response.msg.USER_ID);
        localStorage.setItem('userType', response.msg.USER_TYPE);
        //localStorage.setItem('token', response.msg.USER_TYPE);
        
        
        //localStorage.setItem('roles', response.roles);
        /* var commonData = CommonDataManager.getInstance();
        commonData.setRoles(response.roles); */

        reloadAuthorized();
        //routerRedux.push('/')
       // yield put(routerRedux.push('/orders'));
        if(payload.payload.redirect){
          yield put(routerRedux.push(payload.payload.redirect));
        }else{
          yield put(routerRedux.push('/orders'));
        }
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      if(typeof payload !=="undefined"){
        setAuthority(payload.currentAuthority);
        return {
          ...state,
          status: payload.status,
          type: payload.type,
        };
        
      }
      else{
        return {
          ...state,
          status: false,
          type: "",
        };
      }
      
      
    },
  },
};
