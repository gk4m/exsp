import { createAction } from 'redux-actions';
import { ACTION } from '@/redux/action';
import { Repository } from '@/services';

export const fetchSongs = createAction(
  ACTION.SONG.FETCH_LIST,
  async () => {
    const result = await Repository.fetchUserSavedTracks();
    return result;
  },
);
