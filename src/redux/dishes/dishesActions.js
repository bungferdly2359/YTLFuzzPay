import firebase from 'react-native-firebase';
import { makeRequest } from '../api';

export const actionTypes = {
  setCurrentDishId: 'dishes::setCurrentDishId',
  getDishesByMerchantId: 'dishes::getDishesByMerchantId'
};

export const setCurrentDishId = did => ({
  type: actionTypes.setCurrentDishId,
  payload: did
});

export const getDishesByMerchantId = mid =>
  makeRequest({
    type: actionTypes.getDishesByMerchantId,
    errorType: 'alert',
    api: () =>
      firebase
        .firestore()
        .collection('dishes')
        .where('mid', '==', mid)
        .get()
  });
