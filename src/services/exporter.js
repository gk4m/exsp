import {saveAs} from 'file-saver/FileSaver';
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
      pagination.items = [...pagination.items, ...response.data.items];
    }

    return pagination;
  },

  async _getPlaylistObject(playlist) {
    const response = await this._fetchPlaylistTracks(playlist.owner.id, playlist.id);

    return {
      name: playlist.name,
      public: playlist.public,
      tracks: response.items,
    };
  },

  async exportPlaylists(playlists) {
    const toExport = [];

    for(let i = 0, len = playlists.length; i < len; i++) {
      const obj = await this._getPlaylistObject(playlists[i]);
      toExport.push(obj);
    }

    const file = new File(
      [JSON.stringify(toExport)],
      `backup-${new Date().toLocaleDateString()}.json`,
      {type: "application/json;charset=utf-8"}
    );

    saveAs(file);
  },
}
