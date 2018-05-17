import { actionTypes as apiActionTypes } from '../api';
import { actionTypes } from './';
import { config } from '../../constants';

const currentVersion = 2;

const initialState = (oldState = {}) => ({
  version: currentVersion,
  currentHawkerId: null,
  searchedHawkers: [],
  nearbyHawkers: oldState.nearbyHawkers || [],
  hawkerByhawkerId: oldState.hawkerByhawkerId || {}
});

export function hawkersReducer(state = initialState(), action) {
  const { type, payload } = action;

  switch (type) {
    case '@@INIT':
      return state.version != currentVersion ? initialState(state) : state;

    case actionTypes.getNearbyHawkers:
      return { ...state, nearbyHawkers: (payload.response.docs || []).map(d => ({ hid: d.id, ...d.data() })) };

    case actionTypes.setCurrentHawkerId:
      return { ...state, currentHawkerId: payload };

    case actionTypes.searchHawkers:
      return {
        ...state,
        searchedHawkers: ((payload.response.hits || []).hits || []).map(h => ({ hid: h._id, ...(h._source || {}) }))
      };

    case actionTypes.clearSearchedHawkers:
      return state.searchedHawkers.length == 0
        ? state
        : {
            ...state,
            searchedHawkers: []
          };

    case actionTypes.getHawkerById:
      return { ...state, hawkerByhawkerId: { ...state.hawkerByhawkerId, [payload.response.id]: { hid: payload.response.id, ...payload.response.data() } } };

    default:
      return state;
  }
}
