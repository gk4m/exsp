import { saveAs } from 'file-saver/FileSaver';
import api from '../api'

export default {

  async _fetchPlaylistTracks(user_id, playlist_id) {
    const pagination = {
      limit: 10,
      offset: 0,
      total: 1,
      items: []
    };

    while (pagination.total > pagination.offset) {
      const response = await api.getPlaylistTracks(
        user_id,
        playlist_id,
        pagination.offset,
        pagination.limit,
        'name,offset,total,items(track(id,name,uri))'
      );

      pagination.offset = response.data.offset + pagination.limit;
      pagination.total = response.data.total;
      pagination.items = [...pagination.items, ...response.data.items]
    }

    return pagination;
  },

  async exportPlaylists(playlists) {
    const response = await this._fetchPlaylistTracks(playlists[0].owner.id, playlists[0].id);
    console.log(response);
  },
}
