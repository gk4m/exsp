import { combineReducers } from 'redux';
import { ACTION, createReducer } from '@/redux';

export const reducer = combineReducers({
  playlists: createReducer(ACTION.PLAYLIST.FETCH_LIST),
});
