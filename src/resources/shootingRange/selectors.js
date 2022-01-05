import { getDataSelector } from '../../services/resourceService/getDataSelector';
import { getRequestStateSelector } from '../../services/resourceService/getRequestStateSelector';

const getData = (state) => state.getIn(['shootingRange', 'data']);
const getRequestsState = (state) => state.getIn(['shootingRange', 'requestsState']);

export const selectShootingRange = getDataSelector(getData, ['shootingRange']);
export const selectShootingRanges = getDataSelector(getData, ['shootingRanges']);

export const selectShootingRangeAddRequestState = getRequestStateSelector(
  getRequestsState,
  'shootingRangeAdd',
);
export const selectShootingRangeEditRequestState = getRequestStateSelector(
  getRequestsState,
  'shootingRangeEdit',
);
export const selectShootingRangeDeleteRequestState = getRequestStateSelector(
  getRequestsState,
  'shootingRangeDelete',
);
export const selectShootingRangeGetRequestState = getRequestStateSelector(
  getRequestsState,
  'shootingRangeGet',
);
export const selectShootingRangeGetAllRequestState = getRequestStateSelector(
  getRequestsState,
  'shootingRangeGetAll',
);
