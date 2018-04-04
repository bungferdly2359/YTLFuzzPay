import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';
import { FSArray } from '../../modules/fs-foundation';

const initialState = (oldState = {}) => ({
  currentMid: null,
  merchants: []
});

export function merchantsReducer(state = initialState(), action) {
  const { type, requestType, payload } = action;

  switch (requestType) {
    case apiActionTypes.successOf(apiActionTypes.getMerchants):
      return { ...state, merchants: (payload.response.docs || []).map(d => ({ mid: d.id, ...d.data() })) };

    case apiActionTypes.successOf(apiActionTypes.updateMerchant):
      return { ...state, merchants: [...state.merchants.filter(m => m.mid !== payload.customPayload.mid), payload.customPayload] };

    default:
      return state;
  }
}
