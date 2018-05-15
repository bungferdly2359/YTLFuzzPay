import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';
import { FSArray } from '../../modules/fs-foundation';

const initialState = (oldState = {}) => ({
  hawkers: []
});

export function hawkersReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.getNearbyHawkers:
      return { ...state, hawkers: (payload.response.docs || []).map(d => ({ hid: d.id, ...d.data() })) };

    default:
      return state;
  }
}
