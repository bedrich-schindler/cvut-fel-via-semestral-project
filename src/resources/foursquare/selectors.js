import { getDataSelector } from '../../services/resourceService/getDataSelector';
import { getRequestStateSelector } from '../../services/resourceService/getRequestStateSelector';

const getData = (state) => state.getIn(['foursquare', 'data']);
const getRequestsState = (state) => state.getIn(['foursquare', 'requestsState']);

export const selectFoursquarePlace = getDataSelector(getData, ['foursquarePlace']);
export const selectFoursquarePlaces = getDataSelector(getData, ['foursquarePlaces']);

export const selectFoursquareGetPlaceRequestState = getRequestStateSelector(
  getRequestsState,
  'foursquareGetPlace',
);
export const selectFoursquareSearchPlacesRequestState = getRequestStateSelector(
  getRequestsState,
  'foursquareSearchPlaces',
);
