import { actionTypes } from './apiActions';

const initialState = () => ({
  requests: []
});

export function apiReducer(state = initialState(), action) {
  const { type, requestType, payload } = action;
  switch (type) {
    case actionTypes.start:
    case actionTypes.finish:
    case actionTypes.error: {
      const request = {
        requestType,
        ...(state.requests.find(r => r.requestType === requestType) || {}),
        ...payload
      };
      return {
        ...state,
        requests: [...state.requests.filter(r => r.requestType !== requestType), request]
      };
    }
    case actionTypes.clearError:
      return {
        ...state,
        requests: state.requests.map(r => (r.errorMessage != null ? { ...r, errorMessage: null } : r))
      };
    default:
      return state;
  }
}
