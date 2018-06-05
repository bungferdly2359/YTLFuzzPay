import { actionTypes } from './';

const currentVersion = 1;

const initialState = (oldState = {}) => ({
  version: currentVersion,
  currentMerchantId: null,
  myMerchant: {},
  merchantsByHawkerId: {}
});

export function merchantsReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case '@@INIT':
      return state.version != currentVersion ? initialState(state) : state;

    case actionTypes.getMyMerchant:
      return { ...state, myMerchant: (payload.response.docs || []).map(d => ({ mid: d.id, ...d.data() }))[0] };

    case actionTypes.updateMyMerchant:
      return { ...state, myMerchant: payload.customPayload };

    case actionTypes.getMerchantsByHawkerId: {
      let merchants = (payload.response.docs || []).map(d => ({ mid: d.id, ...d.data() })).sort((a, b) => a.number > b.number);
      let id = (merchants[0] || {}).hid;
      return id ? { ...state, merchantsByHawkerId: { ...state.merchantsByHawkerId, [id]: merchants } } : state;
    }

    case actionTypes.setCurrentMerchantId:
      return { ...state, currentMerchantId: payload };

    default:
      return state;
  }
}
