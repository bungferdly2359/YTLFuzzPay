import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';

const initialState = (oldState = {}) => ({
  currentDishId: null,
  dishes: []
});

export function dishesReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.setCurrentDishId:
      return { ...state, currentDishId: payload };

    case apiActionTypes.getDishes:
      return { ...state, dishes: (payload.response.docs || []).map(d => ({ did: d.id, ...d.data() })) };

    case apiActionTypes.updateDish:
      return { ...state, dishes: state.dishes.mapOrAdd(m => m.did == payload.customPayload.did, () => payload.customPayload) };

    case apiActionTypes.deleteDish:
      return { ...state, dishes: [...state.dishes.filter(m => m.did !== payload.customPayload)] };

    default:
      return state;
  }
}
