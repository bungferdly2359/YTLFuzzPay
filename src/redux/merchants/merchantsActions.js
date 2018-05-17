import firebase from 'react-native-firebase';
import { makeRequest } from '../api';
import { IdHelper } from '../../helpers';

export const actionTypes = {
  updateMyMerchant: 'merchants::updateMyMerchant',
  getMyMerchant: 'merchants::getMyMerchant',
  getMerchantsByHawkerId: 'merchants::getMerchantsByHawkerId'
};

export const getMyMerchant = () =>
  makeRequest({
    type: actionTypes.getMyMerchant,
    api: () =>
      firebase
        .firestore()
        .collection('merchants')
        .where('uid', '==', IdHelper.currentUid())
        .get()
  });

export const updateMyMerchant = ({ mid, ...params }) =>
  makeRequest({
    type: actionTypes.updateMyMerchant,
    customPayload: { mid, ...params },
    loadingText: 'Updating...',
    api: () =>
      firebase
        .firestore()
        .collection('merchants')
        .doc(mid)
        .set(params)
  });

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
