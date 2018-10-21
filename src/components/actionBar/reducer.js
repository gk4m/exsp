import { combineReducers } from 'redux';
import { ACTION, createReducer } from '@/redux';

export const reducer = combineReducers({
  exportPlaylists: createReducer(ACTION.PLAYLIST.FETCH_LIST),
});
