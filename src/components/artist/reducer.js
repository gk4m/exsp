import { combineReducers } from 'redux';
import { ACTION, createReducer } from '@/redux';

export const reducer = combineReducers({
  artists: createReducer(ACTION.ARTIST.FETCH_LIST),
});
