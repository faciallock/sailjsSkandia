import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/sap/login', {
    method: 'POST',
    body: params,
  });
}
export async function dealerSSO(params) {
  console.log(params.payload);
  return request('/api/validateToken', {
    method: 'POST',
    body: params.payload,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getOrderDetail({ orderId }) {
  console.log(orderId);
  return request(`/api/order/findOne?orderId=${orderId}`);
}

export async function getDiscountList({ iimKunnr }) {
  console.log(iimKunnr);
  return request(`/api/discounts/list?iimKunnr=${iimKunnr}`);
}

export async function getDiscountListByName({ iimName, startSearch }) {
  console.log(iimName, startSearch);
  let sParam= !startSearch ? `?iimName=${iimName}`: `?iimName=${iimName}&startSearch='X'`;
  return request(`/api/discounts/listByName${sParam}`);
}
export async function getDiscountDetails({ promoNo, promoSeqNo }) {
  console.log(promoNo);
  console.log(promoSeqNo);
  
  return request(`/api/discounts/details?promoNo=${promoNo}&promoSeqNo=${promoSeqNo}`);
}



export async function getBOM({ orderId, lineItemNumber }) {
  return request(`/api/order/bom?orderId=${orderId}&lineItemNumber=${lineItemNumber}`);
}
export async function getInventory({ orderId }) {
  console.log({ orderId });
  return request(`/api/order/inventory?orderId=${orderId}`);
}



export async function getOrders({ userName, userType }) {
  console.log(userName);
  return request(`/api/Orders?userName=${userName}&imInd=${userType}`);
}

export async function searchOrder(params) {
  return request('/api/orders/search', {
    method: 'POST',
    body: params,
  });
}





export async function getUserType({ userId  }) {
  console.log(userId);
  return request(`/api/user/type?userId=${userId}`);
}

export async function addComment(params) {
  return request('/api/orders/comment', {
    method: 'POST',
    body: params,
  });
}


/* export async function getOrderDetail() {
  console.log(orderId);
  return request(`/api/orderDetails?orderId=1`);

}
 */

