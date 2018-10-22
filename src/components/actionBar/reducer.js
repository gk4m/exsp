import { combineReducers } from 'redux';
import { ACTION, createReducer } from '@/redux';

export const reducer = combineReducers({
  imported: createReducer(ACTION.IMPORT),
});
