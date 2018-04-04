import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';

const currentVersion = 1;

const initialState = (oldState = {}) => ({
  version: currentVersion,
  isRegistered: oldState.isRegistered || false,
  refreshToken: null,
  uid: null,
  firstName: null,
  lastName: null,
  username: null,
  phoneNumber: null,
  bankName: null,
  bankAccount: null
});

export function userReducer(state = initialState(), action) {
  const { type, requestType, payload } = action;

  switch (type) {
    case '@@redux/INIT':
      return state.version !== currentVersion ? initialState(state) : state;
    case actionTypes.updateData:
      return { ...state, ...payload };
  }

  switch (requestType) {
    case apiActionTypes.successOf(apiActionTypes.register):
      return { ...state, ...payload.customPayload };

    case apiActionTypes.successOf(apiActionTypes.verifyPhoneNumber):
      return {
        ...state,
        isRegistered: true,
        refreshToken: (((payload || {}).response || {})._user || {}).refreshToken,
        uid: (((payload || {}).response || {})._user || {}).uid
      };

    default:
      return state;
  }
}
