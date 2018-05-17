import firebase from 'react-native-firebase';
import { makeRequest } from '../api';

export const actionTypes = {
  getMerchantsByHawkerId: 'merchants::getMerchantsByHawkerId'
};

export const getMerchantsByHawkerId = hid =>
  makeRequest({
    type: actionTypes.getMerchantsByHawkerId,
    errorType: 'alert',
    api: () =>
      firebase
        .firestore()
        .collection('merchants')
        .where('hid', '==', hid)
        .get()
  });
