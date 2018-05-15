import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';

const currentVersion = 1;

const initialState = (oldState = {}) => ({
  version: currentVersion,
  isRegistered: oldState.isRegistered || false,
  refreshToken: null,
  uid: null,
  fullName: null,
  userName: null,
  phoneNumber: null,
  bankName: null,
  bankAccount: null
});

export function userReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case '@@redux/INIT':
      return state.version !== currentVersion ? initialState(state) : state;

    case actionTypes.updateData:
      return { ...state, ...payload };

    case apiActionTypes.getUser:
      return { ...state, ...payload.response.data() };

    case apiActionTypes.updateUser:
      return { ...state, ...payload.customPayload };

    case apiActionTypes.register:
      return { ...state, ...payload.customPayload };

    case apiActionTypes.verifyPhoneNumber: {
      const { refreshToken, uid } = ((payload || {}).response || {})._user || {};
      return {
        ...state,
        isRegistered: true,
        refreshToken,
        uid
      };
    }

    default:
      return state;
  }
}
