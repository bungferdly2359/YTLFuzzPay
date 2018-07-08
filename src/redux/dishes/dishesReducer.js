import { actionTypes } from './';
import { actionTypes as userActionTypes } from '../user';

const currentVersion = 1;

const initialState = (oldState = {}) => ({
  version: currentVersion,
  currentDishId: null,
  dishesByMerchantId: {}
});

export function dishesReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case '@@INIT':
      return state.version != currentVersion ? initialState(state) : state;

    case actionTypes.setCurrentDishId:
      return { ...state, currentDishId: payload };

    case actionTypes.updateDish: {
      let mid = payload.customPayload.mid;
      let dishes = (state.dishesByMerchantId[mid] || []).mapOrAdd(m => m.did == payload.customPayload.did, () => payload.customPayload).sort((a, b) => a.name > b.name);
      return { ...state, dishesByMerchantId: { ...state.dishesByMerchantId, [mid]: dishes } };
    }

    case actionTypes.deleteDish: {
      let mid = payload.customPayload.mid;
      let dishes = state.dishesByMerchantId[mid].filter(m => m.did !== payload.customPayload.did);
      return { ...state, dishesByMerchantId: { ...state.dishesByMerchantId, [mid]: dishes } };
    }

    case actionTypes.getDishesByMerchantId: {
      let mid = payload.customPayload.mid;
      let dishes = (payload.response.docs || []).map(d => ({ did: d.id, ...d.data() })).sort((a, b) => a.name > b.name);
      return dishes.length > 0 ? { ...state, dishesByMerchantId: { ...state.dishesByMerchantId, [mid]: dishes } } : state;
    }

    case userActionTypes.logout:
      return initialState();

    default:
      return state;
  }
}
