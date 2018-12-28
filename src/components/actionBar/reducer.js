import { combineReducers } from 'redux';
import { ACTION, createReducer } from '@/redux';

export const reducer = combineReducers({
  import: createReducer(ACTION.ACTION.IMPORT),
  export: createReducer(ACTION.ACTION.EXPORT),
});
