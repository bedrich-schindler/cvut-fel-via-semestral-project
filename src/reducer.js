import { combineReducers } from 'redux-immutable';
import { reducer as shootingRangeReducer } from './resources/shootingRange';

const appReducer = combineReducers({
  shootingRange: shootingRangeReducer,
});

export default (state, action) => appReducer(state, action);
