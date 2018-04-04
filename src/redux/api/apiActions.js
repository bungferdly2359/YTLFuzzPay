import baseApi from './baseApi';
import firebase from 'react-native-firebase';
import { IdHelper } from '../../helpers';

export const actionTypes = {
  register: 'api::request::register',
  updateMerchant: 'api::request::updateMerchant',
  getMerchants: 'api::request::getMerchants',
  getUser: 'api::request::getUser',
  updateUser: 'api::request::updateUser',
  verifyPhoneNumber: 'api::request::verifyPhoneNumber',
  clearError: 'api::clearError',
  loadingOf: x => `${x}::loading`,
  successOf: x => `${x}::success`,
  failedOf: x => `${x}::failed`
};

let confirmResult = null;
const db = name => firebase.firestore().collection(name);

export const clearError = ({ requestType }) => ({
  type: actionTypes.clearError,
  payload: { requestType }
});

export const getMerchants = () =>
  baseApi({
    type: actionTypes.getMerchants,
    api: db('merchants')
      .where('uid', '==', IdHelper.currentUid())
      .get()
  });

export const updateMerchant = ({ mid, ...params }) =>
  baseApi({
    type: actionTypes.updateMerchant,
    customPayload: { mid, ...params },
    loadingText: 'Updating...',
    api: db('merchants')
      .doc(mid)
      .set(params)
  });

export const getUser = () =>
  baseApi({
    type: actionTypes.getUser,
    api: db('users')
      .doc(IdHelper.currentUid())
      .get()
  });

export const updateUser = params =>
  baseApi({
    type: actionTypes.updateUser,
    customPayload: params,
    loadingText: 'Updating...',
    api: db('users')
      .doc(IdHelper.currentUid())
      .set(params)
  });

export const register = params =>
  baseApi({
    type: actionTypes.register,
    customPayload: params,
    loadingText: 'Registering...',
    api: firebase
      .auth()
      .signInWithPhoneNumber(params.phoneNumber)
      .then(r => {
        confirmResult = r;
        return r;
      })
  });

export const verifyPhoneNumber = verificationCode =>
  baseApi({
    type: actionTypes.verifyPhoneNumber,
    api: confirmResult.confirm(verificationCode),
    loadingText: 'Verifying...'
  });
