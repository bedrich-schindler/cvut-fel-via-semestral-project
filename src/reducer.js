import { combineReducers } from 'redux-immutable';
import { reducer as foursquareReducer } from './resources/foursquare';
import { reducer as shootingRangeReducer } from './resources/shootingRange';

const appReducer = combineReducers({
  foursquare: foursquareReducer,
  shootingRange: shootingRangeReducer,
});

export default (state, action) => appReducer(state, action);
