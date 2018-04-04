import baseApi from './baseApi';
import firebase from 'react-native-firebase';

export const actionTypes = {
  register: 'api::request::register',
  getUser: 'api::request::getUser',
  updateUser: 'api::request::updateUser',
  verifyPhoneNumber: 'api::request::verifyPhoneNumber',
  clearError: 'api::clearError',
  loadingOf: x => `${x}::loading`,
  successOf: x => `${x}::success`,
  failedOf: x => `${x}::failed`
};

let confirmResult = null;

export const clearError = ({ requestType }) => ({
  type: actionTypes.clearError,
  payload: { requestType }
});

export const getUser = () =>
  baseApi({
    type: actionTypes.getUser,
    api: firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
  });

export const updateUser = params =>
  baseApi({
    type: actionTypes.updateUser,
    api: firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set(params),
    customPayload: params,
    loadingText: 'Updating...'
  });

export const register = params =>
  baseApi({
    type: actionTypes.register,
    api: firebase
      .auth()
      .signInWithPhoneNumber(params.phoneNumber)
      .then(r => {
        confirmResult = r;
        return r;
      }),
    customPayload: params,
    loadingText: 'Registering...'
  });

export const verifyPhoneNumber = verificationCode =>
  baseApi({
    type: actionTypes.verifyPhoneNumber,
    api: confirmResult.confirm(verificationCode),
    loadingText: 'Verifying...'
  });
