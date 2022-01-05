import { createSelector } from 'reselect';

export const getDataSelector = (state, dataPath) => createSelector(
  [state],
  (data) => {
    const value = data.getIn(dataPath);
    if (value && value.toJS) {
      return value.toJS();
    }

    return value;
  },
);
