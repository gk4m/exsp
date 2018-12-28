import { createAction } from 'redux-actions';
import { ACTION } from '@/redux/action';
import { Repository } from '@/services';

export const fetchAlbums = createAction(ACTION.ALBUM.FETCH_LIST, async () => await Repository.fetchAlbums());
