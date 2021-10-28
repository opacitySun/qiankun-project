import { combineReducers } from 'redux';
import testReducer from './test';
import planReducer from './plan';

const reducers = {
  testReducer,
  planReducer
};

export default combineReducers(reducers);