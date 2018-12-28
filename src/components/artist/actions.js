import { createAction } from 'redux-actions';
import { ACTION } from '@/redux/action';
import { Repository } from '@/services';

export const fetchArtists = createAction(
  ACTION.ARTIST.FETCH_LIST,
  async () => {
    const result = await Repository.fetchArtists();
    return result;
  },
);
