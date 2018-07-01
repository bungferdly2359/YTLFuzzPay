import { actionTypes } from './';
import { config } from '../../constants';

const initialState = (oldState = {}) => ({
  cart: [],
  orders: [],
  currentOrderId: null,
  customers: []
});

export function ordersReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.getOrders:
      return { ...state, orders: (payload.response.docs || []).map(d => ({ oid: d.id, ...d.data() })).sort((a, b) => a.oid < b.oid) };

    case actionTypes.updateOrderStatus:
      return { ...state, orders: state.orders.map(o => (o.oid == payload.customPayload.oid ? { ...o, ...payload.customPayload } : o)) };

    case actionTypes.addItemToCart:
      return { ...state, cart: [...state.cart, payload] };

    case actionTypes.removeItemFromCart:
      return { ...state, cart: state.cart.filter(i => i !== payload) };

    case actionTypes.updateCart:
      return { ...state, cart: payload };

    case actionTypes.makeOrder:
      return { ...state, cart: [] };

    case actionTypes.setCurrentOrderId:
      return { ...state, currentOrderId: payload };

    default:
      return state;
  }
}
