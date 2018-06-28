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
export async function getBOM({ orderId, lineItemNumber }) {
  console.log({orderId});
  console.log({ lineItemNumber });
  return request(`/api/order/bom?orderId=${orderId}&lineItemNumber=${lineItemNumber}`);
}
export async function getOrders({ userName }) {
  console.log(userName);
  return request(`/api/Orders?userName=${userName}&imInd=C`);
}
export async function getUserType({ userId }) {
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

