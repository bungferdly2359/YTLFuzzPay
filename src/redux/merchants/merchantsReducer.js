import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';

const currentVersion = 1;

const initialState = (oldState = {}) => ({
  currentMerchantId: 0,
  merchants: [
    {
      name: null,
      menus: [{}]
    }
  ]
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
      return { ...state, merchants: state.merchants.map((m, i) => (i == state.currentMerchantId ? { ...m, name: payload.customPayload.merchantName } : m)) };

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
