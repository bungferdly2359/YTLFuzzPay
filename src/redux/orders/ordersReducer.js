import { actionTypes as apiActionTypes } from '../api';
import { config } from '../../constants';
import { FSArray } from '../../modules/fs-foundation';

const initialState = (oldState = {}) => ({
  orders: [],
  customers: []
});

export function ordersReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case apiActionTypes.getOrders:
      return { ...state, ...payload.response };

    case apiActionTypes.updateOrderStatus:
      return { ...state, dishes: FSArray.mapOrAdd(state.orders, o => o.oid == payload.customPayload.oid, m => ({ ...m, ...payload.customPayload })) };

    default:
      return state;
  }
}
