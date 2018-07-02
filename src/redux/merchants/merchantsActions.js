import firebase from 'react-native-firebase';
import { makeRequest, uploadImagePromise } from '../api';
import { IdHelper } from '../../helpers';

export const actionTypes = {
  setCurrentMerchantId: 'merchants::setCurrentMerchantId',
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

export const updateMyMerchant = ({ imagePath, ...params }) => {
  const customPayload = { ...params };
  return makeRequest({
    type: actionTypes.updateMyMerchant,
    customPayload: customPayload,
    loadingText: 'Updating...',
    api: () =>
      uploadImagePromise(IdHelper.merchantIid(params.mid), imagePath).then(({ downloadURL }) => {
        if (downloadURL) {
          customPayload.imageURL = downloadURL;
        }
        return firebase
          .firestore()
          .collection('merchants')
          .doc(params.mid)
          .set(customPayload, { merge: true });
      })
  });
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

export const setCurrentMerchantId = mid => ({
  type: actionTypes.setCurrentMerchantId,
  payload: mid
});
