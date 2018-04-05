import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';
import { FSArray } from '../../modules/fs-foundation';

const initialState = (oldState = {}) => ({
  currentDid: null,
  dishes: []
});

export function dishesReducer(state = initialState(), action) {
  const { type, requestType, payload } = action;

  switch (type) {
    case actionTypes.setCurrentDid:
      return { ...state, currentDid: payload };
    default:
      break;
  }

  switch (requestType) {
    case apiActionTypes.successOf(apiActionTypes.getDishes):
      return { ...state, dishes: (payload.response.docs || []).map(d => ({ did: d.id, ...d.data() })) };

    case apiActionTypes.successOf(apiActionTypes.updateDish):
      return { ...state, dishes: FSArray.mapOrAdd(state.dishes, m => m.did == payload.customPayload.did, () => payload.customPayload) };

    case apiActionTypes.successOf(apiActionTypes.deleteDish):
      return { ...state, dishes: [...state.dishes.filter(m => m.did !== payload.customPayload)] };

    default:
      return state;
  }
}