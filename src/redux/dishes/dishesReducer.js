import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';

const currentVersion = 1;

const initialState = (oldState = {}) => ({
  version: currentVersion,
  currentDishId: null,
  dishes: [],
  dishesByMerchantId: {}
});

export function dishesReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case '@@INIT':
      return state.version != currentVersion ? initialState(state) : state;

    case actionTypes.setCurrentDishId:
      return { ...state, currentDishId: payload };

    case apiActionTypes.getDishes:
      return { ...state, dishes: (payload.response.docs || []).map(d => ({ did: d.id, ...d.data() })) };

    case apiActionTypes.updateDish:
      return { ...state, dishes: state.dishes.mapOrAdd(m => m.did == payload.customPayload.did, () => payload.customPayload) };

    case apiActionTypes.deleteDish:
      return { ...state, dishes: [...state.dishes.filter(m => m.did !== payload.customPayload)] };

    case actionTypes.getDishesByMerchantId: {
      let dishes = (payload.response.docs || []).map(d => ({ did: d.id, ...d.data() })).sort((a, b) => a.name > b.name);
      let id = (dishes[0] || {}).mid;
      return id ? { ...state, dishesByMerchantId: { ...state.dishesByMerchantId, [id]: dishes } } : state;
    }

    default:
      return state;
  }
}
