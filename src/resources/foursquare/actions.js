import { createAction } from 'redux-api-middleware';
import {
  FOURSQUARE_API_KEY,
} from '../../config';
import * as actionTypes from './actionTypes';

const FOURSQUARE_PLACES_API_URL = 'https://api.foursquare.com/v3/places';

const FOURSQUARE_PLACE_QUERY = 'fields=fsq_id,name,photos,tips';
export const foursquareGetPlace = (fsqId) => (dispatch) => dispatch(createAction({
  endpoint: `${FOURSQUARE_PLACES_API_URL}/${fsqId}?${FOURSQUARE_PLACE_QUERY}`,
  headers: {
    Accept: 'application/json',
    Authorization: FOURSQUARE_API_KEY,
  },
  method: 'GET',
  types: [
    actionTypes.FOURSQUARE_GET_PLACE_REQUEST,
    actionTypes.FOURSQUARE_GET_PLACE_SUCCESS,
    actionTypes.FOURSQUARE_GET_PLACE_FAILURE,
  ],
}));

const FOURSQUARE_PLACES_QUERY = 'categories=18020&fields=fsq_id,name,geocodes,location,tel,website&limit=50';
export const foursquareSearchPlaces = (data) => (dispatch) => dispatch(createAction({
  endpoint: `${FOURSQUARE_PLACES_API_URL}/search?query=${data.name}&near=${data.place}&${FOURSQUARE_PLACES_QUERY}`,
  headers: {
    Accept: 'application/json',
    Authorization: FOURSQUARE_API_KEY,
  },
  method: 'GET',
  types: [
    actionTypes.FOURSQUARE_SEARCH_PLACES_REQUEST,
    actionTypes.FOURSQUARE_SEARCH_PLACES_SUCCESS,
    actionTypes.FOURSQUARE_SEARCH_PLACES_FAILURE,
  ],
}));
