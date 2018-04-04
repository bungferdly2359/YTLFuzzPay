import baseApi from './baseApi';
import firebase from 'react-native-firebase';

export const actionTypes = {
  loadingOf: x => `${x}::loading`,
  successOf: x => `${x}::success`,
  failedOf: x => `${x}::failed`
};

let confirmResult = null;

export const clearError = ({ requestType }) => ({
  type: actionTypes.clearError,
  payload: { requestType }
});

export const registerWithPhoneNumber = phoneNumber => (dispatch, getState) => {
  return firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber)
    .then(cr => {
      debugger;
      confirmResult = cr;
    })
    .catch(err => {
      debugger;
      throw err;
    });
};

export const verifyPhoneNumber = verificationCode => (dispatch, getState) => {
  return confirmResult
    .confirm(verificationCode)
    .then(user => {
      debugger;
    })
    .catch(err => {
      debugger;
      throw err;
    });
};
