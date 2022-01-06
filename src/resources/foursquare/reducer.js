import Immutable from 'immutable';
import initialState from './initialState';
import * as actionTypes from './actionTypes';

export default (state, action) => {
  if (state === undefined) {
    return initialState;
  }

  const {
    payload,
    type,
  } = action;

  let localState = state;

  if (type.startsWith('foursquare')) {
    const [, method, requestState] = type.split('/');
    localState = localState.setIn(['requestsState', method], requestState);
  }

  if (type === actionTypes.FOURSQUARE_GET_PLACE_SUCCESS) {
    return localState.setIn(['data', 'foursquarePlace'], Immutable.fromJS(payload));
  }

  if (type === actionTypes.FOURSQUARE_SEARCH_PLACES_SUCCESS) {
    return localState.setIn(['data', 'foursquarePlaces'], Immutable.fromJS(payload));
  }

  return localState;
};
