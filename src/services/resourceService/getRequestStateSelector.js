import { createSelector } from 'reselect';

export const getRequestStateSelector = (state, requestName) => createSelector(
  [state],
  (data) => data.get(requestName),
);
