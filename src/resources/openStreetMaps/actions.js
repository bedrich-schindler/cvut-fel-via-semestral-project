import { createAction } from 'redux-api-middleware';
import * as actionTypes from './actionTypes';

const OPEN_STREET_MAPS_API_URL = 'https://nominatim.openstreetmap.org';

export const openStreetMapsGetDetail = (data) => (dispatch) => dispatch(createAction({
  endpoint: `${OPEN_STREET_MAPS_API_URL}/search?q=${data.street}${data.street.length > 0 && ','}${data.city}&format=json`,
  headers: {
    Accept: 'application/json',
  },
  method: 'GET',
  types: [
    actionTypes.OSM_GET_DETAIL_REQUEST,
    actionTypes.OSM_GET_DETAIL_SUCCESS,
    actionTypes.OSM_GET_DETAIL_FAILURE,
  ],
}));
