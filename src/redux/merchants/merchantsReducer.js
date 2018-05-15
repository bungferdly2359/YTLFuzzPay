import { actionTypes as apiActionTypes } from '../api';
import { config } from '../../constants';
import { FSArray } from '../../modules/fs-foundation';

const initialState = (oldState = {}) => ({
  currentMid: null,
  merchants: []
});

export function merchantsReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case apiActionTypes.getMerchants:
      return { ...state, merchants: (payload.response.docs || []).map(d => ({ mid: d.id, ...d.data() })) };

    case apiActionTypes.updateMerchant:
      return { ...state, merchants: [...state.merchants.filter(m => m.mid !== payload.customPayload.mid), payload.customPayload] };

    default:
      return state;
  }
}
