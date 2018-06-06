import firebase from 'react-native-firebase';
import { makeRequest } from '../api';
import { OrderHelper } from '../../helpers';

export const actionTypes = {
  getOrders: 'orders::getOrders',
  updateOrderStatus: 'orders::updateOrderStatus',
  addItemToCart: 'orders::addItemToCart',
  updateCart: 'orders::updateCart'
};

export const getOrders = mid => (dispatch, getState) =>
  baseApi({
    type: actionTypes.getOrders,
    api: () =>
      db('orders')
        .where('mid', '==', mid)
        .get()
        .then(resp => {
          const oldCustomers = getState().orders.customers;
          const orders = (resp.docs || []).map(d => ({ oid: d.id, ...d.data() }));
          const newCustomerUids = orders.filter(o => oldCustomers.every(c => c.uid != o.uid)).map(o => o.uid);
          const amid = mid;
          return Promise.all(
            newCustomerUids.map(uid =>
              db('users')
                .doc(uid)
                .get()
            )
          ).then(resp => {
            const dishes = getState().dishes.dishes;
            const newCustomers = resp.map(r => ({ uid: r.id, ...r.data() }));
            const customers = [...oldCustomers, ...newCustomers];
            return {
              orders: OrderHelper.getOrdersInfo(orders, customers, dishes),
              customers
            };
          });
        })
  })(dispatch, getState);

export const updateOrderStatus = (oid, status) =>
  baseApi({
    type: actionTypes.updateOrderStatus,
    customPayload: { status },
    api: () =>
      db('orders')
        .doc(oid)
        .set({ status }, { merge: true })
  });

export const addItemToCart = item => ({
  type: actionTypes.addItemToCart,
  payload: item
});

export const updateCart = cart => ({
  type: actionTypes.updateCart,
  payload: cart
});
