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

  if (type.startsWith('shootingRange')) {
    const [, method, requestState] = type.split('/');
    localState = localState.setIn(['requestsState', method], requestState);
  }

  if (type === actionTypes.SHOOTING_RANGE_GET_SUCCESS) {
    return localState.setIn(['data', 'shootingRange'], Immutable.fromJS(payload));
  }

  if (type === actionTypes.SHOOTING_RANGE_GET_ALL_SUCCESS) {
    localState = localState.setIn(['data', 'shootingRanges'], Immutable.fromJS(payload));
  }

  return localState;
};
