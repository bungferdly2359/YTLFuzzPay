import { actionTypes } from './';
import { config } from '../../constants';

const initialState = (oldState = {}) => ({
  cart: [],
  orders: [],
  customers: []
});

export function ordersReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.getOrders:
      return { ...state, ...payload.response };

    case actionTypes.updateOrderStatus:
      return { ...state, dishes: state.orders.mapOrAdd(o => o.oid == payload.customPayload.oid, m => ({ ...m, ...payload.customPayload })) };

    case actionTypes.addItemToCart:
      return { ...state, cart: [...state.cart, payload] };

    case actionTypes.removeItemFromCart:
      return { ...state, cart: state.cart.filter(i => i !== payload) };

    case actionTypes.updateCart:
      return { ...state, cart: payload };

    default:
      return state;
  }
}
