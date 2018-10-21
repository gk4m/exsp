import { createAction } from 'redux-actions';

import { ACTION } from '@/redux/action';

import {
  Repository,
} from '@/services';

export const exportPlaylists = createAction(ACTION.PLAYLIST.FETCH_LIST, async () => {
  return await Repository.fetchPlaylists();
});

