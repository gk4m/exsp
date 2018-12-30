import { combineReducers } from 'redux';
import { ACTION, createReducer } from '@/redux';

export const reducer = combineReducers({
  songs: createReducer(ACTION.SONG.FETCH_LIST),
});
