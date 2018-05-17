import { actionTypes as apiActionTypes } from '../api';
import { config } from '../../constants';

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
      return { ...state, dishes: state.orders.mapOrAdd(o => o.oid == payload.customPayload.oid, m => ({ ...m, ...payload.customPayload })) };

    default:
      return state;
  }
}
