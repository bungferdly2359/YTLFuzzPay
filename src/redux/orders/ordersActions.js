import firebase from 'react-native-firebase';
import { makeRequest } from '../api';
import { OrderHelper, IdHelper } from '../../helpers';

export const actionTypes = {
  getOrders: 'orders::getOrders',
  updateOrderStatus: 'orders::updateOrderStatus',
  addItemToCart: 'orders::addItemToCart',
  removeItemFromCart: 'orders::removeItemFromCart',
  makeOrder: 'orders::makeOrder',
  updateCart: 'orders::updateCart'
};

export const getOrders = mid => (dispatch, getState) =>
  makeRequest({
    type: actionTypes.getOrders,
    api: () =>
      firebase
        .firestore()
        .collection('orders')
        .where('mid', '==', mid)
        .get()
  })(dispatch, getState);

export const getOrdersAsCustomer = () =>
  makeRequest({
    type: actionTypes.getOrders,
    api: () =>
      firebase
        .firestore()
        .collection('orders')
        .where('uid', '==', IdHelper.currentUid())
        .limit(10)
        .get()
  });

export const makeOrder = items =>
  makeRequest({
    type: actionTypes.makeOrder,
    loadingText: 'Ordering...',
    api: () => {
      const db = firebase.firestore();
      const batch = db.batch();
      items.forEach(({ oid, ...item }) => {
        const ref = db.collection('orders').doc(oid);
        batch.set(ref, item);
      });
      return batch.commit();
    }
  });

export const updateOrderStatus = (oid, status) =>
  makeRequest({
    type: actionTypes.updateOrderStatus,
    customPayload: { status },
    api: () =>
      firebase
        .firestore()
        .collection('orders')
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

export const removeItemFromCart = item => ({
  type: actionTypes.removeItemFromCart,
  payload: item
});
