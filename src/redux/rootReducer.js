import { combineReducers } from 'redux';

import { reducer as playlist } from '@/components/playlist';
import { reducer as album } from '@/components/album';
import { reducer as artist } from '@/components/artist';

export const rootReducer = combineReducers({
  playlist,
  album,
  artist,
});
