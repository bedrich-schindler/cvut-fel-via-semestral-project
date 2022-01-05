import { createAction } from 'redux-api-middleware';
import { API_URL } from '../../config';
import * as actionTypes from './actionTypes';

export const shootingRangeAdd = (shootingRange) => (dispatch) => dispatch(createAction({
  body: JSON.stringify(shootingRange),
  endpoint: `${API_URL}/shooting-range/`,
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  types: [
    actionTypes.SHOOTING_RANGE_ADD_REQUEST,
    actionTypes.SHOOTING_RANGE_ADD_SUCCESS,
    actionTypes.SHOOTING_RANGE_ADD_FAILURE,
  ],
}));

export const shootingRangeDelete = (id) => (dispatch) => dispatch(createAction({
  endpoint: `${API_URL}/shooting-range/${id}`,
  headers: { 'Content-Type': 'application/json' },
  method: 'DELETE',
  types: [
    actionTypes.SHOOTING_RANGE_DELETE_REQUEST,
    actionTypes.SHOOTING_RANGE_DELETE_SUCCESS,
    actionTypes.SHOOTING_RANGE_DELETE_FAILURE,
  ],
}));

export const shootingRangeEdit = (id, shootingRange) => (dispatch) => dispatch(createAction({
  body: JSON.stringify(shootingRange),
  endpoint: `${API_URL}/shooting-range/${id}`,
  headers: { 'Content-Type': 'application/json' },
  method: 'PUT',
  types: [
    actionTypes.SHOOTING_RANGE_EDIT_REQUEST,
    actionTypes.SHOOTING_RANGE_EDIT_SUCCESS,
    actionTypes.SHOOTING_RANGE_EDIT_FAILURE,
  ],
}));

export const shootingRangeGet = (id) => (dispatch) => dispatch(createAction({
  endpoint: `${API_URL}/shooting-range/${id}`,
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
  types: [
    actionTypes.SHOOTING_RANGE_GET_REQUEST,
    actionTypes.SHOOTING_RANGE_GET_SUCCESS,
    actionTypes.SHOOTING_RANGE_GET_FAILURE,
  ],
}));

export const shootingRangeGetAll = () => (dispatch) => dispatch(createAction({
  endpoint: `${API_URL}/shooting-range/`,
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
  types: [
    actionTypes.SHOOTING_RANGE_GET_ALL_REQUEST,
    actionTypes.SHOOTING_RANGE_GET_ALL_SUCCESS,
    actionTypes.SHOOTING_RANGE_GET_ALL_FAILURE,
  ],
}));

