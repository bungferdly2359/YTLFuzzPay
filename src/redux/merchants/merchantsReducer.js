import { actionTypes as apiActionTypes } from '../api';
import { config } from '../../constants';
import { FSArray } from '../../modules/fs-foundation';

const initialState = (oldState = {}) => ({
  currentMid: null,
  merchants: [],
  merchantsByHawkerId: {
    VS5O1xddtexrf8qBqPgY: [
      {
        name: 'Chicky Fun',
        number: '#01-01',
        tags: 'halal'
      },
      {
        name: 'Drinks & Beverages',
        number: '#01-02',
        tags: 'drinks, beverages'
      },
      {
        name: 'Malay Stall',
        number: '#01-03',
        tags: 'no pork no lard'
      },
      {
        name: 'Chinese Stall',
        number: '#01-04'
      },
      {
        name: 'India Stall',
        number: '#01-05',
        tags: 'halal, vegetarian'
      }
    ]
  }
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
