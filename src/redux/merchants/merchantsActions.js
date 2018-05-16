import firebase from 'react-native-firebase';
import { makeRequest } from '../api';

export const actionTypes = {
  getMerchantsByHawkerId: 'merchants::getMerchantsByHawkerId'
};

export const getMerchantsByHawkerId = hid => dispatch => {
  return Promise.resolve();
};
