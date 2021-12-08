import thunkMiddleware from 'redux-thunk';
import { createMiddleware } from 'redux-api-middleware';

export default [
  thunkMiddleware,
  createMiddleware(),
];
