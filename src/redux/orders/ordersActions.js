import firebase from 'react-native-firebase';
import { makeRequest } from '../api';
import { OrderHelper, IdHelper } from '../../helpers';

export const actionTypes = {
  getOrders: 'orders::getOrders',
  updateOrderStatus: 'orders::updateOrderStatus',
  addItemToCart: 'orders::addItemToCart',
  removeItemFromCart: 'orders::removeItemFromCart',
  makeOrder: 'orders::makeOrder',
  updateCart: 'orders::updateCart',
  setCurrentOrderId: 'orders::setCurrentOrderId'
};

export const getOrders = ({ mid, uid }) => (dispatch, getState) =>
  makeRequest({
    type: actionTypes.getOrders,
    api: () =>
      firebase
        .firestore()
        .collection('orders')
        .where(mid ? 'mid' : 'uid', '==', mid || uid)
        .where('createdDate', '>=', Date.now() - 604800)
        .get()
  })(dispatch, getState);

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
    loadingText: 'Updating...',
    customPayload: { oid, status },
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

export const setCurrentOrderId = oid => ({
  type: actionTypes.setCurrentOrderId,
  payload: oid
});
