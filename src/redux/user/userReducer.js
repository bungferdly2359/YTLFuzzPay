import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';

const currentVersion = 1;

const initialState = (oldState = {}) => ({
  version: currentVersion,
  isRegistered: oldState.isRegistered || false,
  refreshToken: null,
  uid: null,
  name: null,
  userName: null,
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

    case actionTypes.getUser:
      return { ...state, ...payload.response.data() };

    case actionTypes.register:
    case actionTypes.login:
    case actionTypes.signInWithFacebook:
    case actionTypes.signInWithGoogle: {
      const { refreshToken, email, displayName, uid, photoURL } = payload.response.user._user;
      const { email: email2 } = (payload.response.additionalUserInfo || {}).profile || {};
      return { ...state, isRegistered: true, refreshToken, email: email || email2, displayName, uid, photoURL };
    }

    case actionTypes.logout:
      return initialState();

    default:
      return state;
  }
}
