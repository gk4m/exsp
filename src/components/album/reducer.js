import { combineReducers } from 'redux';
import { ACTION, createReducer } from '@/redux';

export const reducer = combineReducers({
  albums: createReducer(ACTION.ALBUM.FETCH_LIST),
});
