import { actionTypes } from './apiActions';

const initialState = () => ({
  requests: []
});

export function apiReducer(state = initialState(), action) {
  const { type, payload } = action;
  if (type.startsWith('api::request::')) {
    const request = { ...(state.requests.find(r => r.type === type) || {}), type, ...payload };
    return {
      ...state,
      requests: [...state.requests.filter(r => r.type !== type), request]
    };
  } else if (type === actionTypes.clearError) {
    return {
      ...state,
      requests: state.requests.map(r => (r.type === payload.requestType ? ({ ...r, errorMessage: null }) : r))
    };
  }
  return state;
}
