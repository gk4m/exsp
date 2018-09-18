import {saveAs} from 'file-saver/FileSaver';
import api from '../api'
import auth from './auth'
import {getParameterByName} from '../utils'

const exporter  = {

  async _fetch(callback) {
    const pagination = {
      limit: 50,
      offset: 0,
      total: 1,
      items: []
    };

    try {
      while (pagination.total > pagination.offset) {
        const response = await callback(pagination.offset, pagination.limit);

        const {
          offset,
          total,
          items,
        } = response.data;

        pagination.offset = offset + pagination.limit;
        pagination.total = total;
        pagination.items = [...pagination.items, ...items];
      }
    } catch (e) {
      console.error(e);
    }

    return pagination;
  },

  fetchPlaylistTracks(user_id, playlist_id) {
    return this._fetch((offset, limit) => {
      return api.getPlaylistTracks(
        user_id,
        playlist_id,
        offset,
        limit,
        'name,offset,total,items(track(id,name,uri))'
      );
    })
  },

  fetchPlaylists() {
    return this._fetch((offset, limit) => {
      return api.getUserPlaylists(offset, limit);
    })
  },

  fetchAlbums() {
    return this._fetch((offset, limit) => {
      return api.getAlbums(offset, limit);
    })
  },

  fetchUserSavedTracks() {
    return this._fetch((offset, limit) => {
      return api.getTracks(offset, limit);
    })
  },

  async fetchArtists() {
    const pagination = {
      limit: 50,
      offset: 0,
      total: 1,
      after: null,
      items: []
    };

    try {
      while (pagination.total > pagination.offset) {
        const response = await api.getFollowedArtists(pagination.limit, pagination.after);

        const {
          next,
          total,
          items,
        } = response.data.artists;

        pagination.after = getParameterByName('after', next);
        pagination.total = total;
        pagination.items.push(...items);
        pagination.offset = pagination.items.length;

      }
    } catch (e) {
      console.error(e)
    }

    return pagination;
  },

  async _getPlaylistObject(playlist) {
    const response = await this.fetchPlaylistTracks(playlist.owner.id, playlist.id);

    return {
      name: playlist.name,
      public: playlist.public,
      tracks: response.items,
    };
  },

  async exportPlaylists(selectedPlaylist) {
    if (!selectedPlaylist.length) return;

    const toExport = [];
    const {items: playlists} = await exporter.fetchPlaylists();

    for (let i = 0, len = playlists.length; i < len; i++) {
      if(selectedPlaylist.indexOf(playlists[i].id) > -1) {
        const obj = await this._getPlaylistObject(playlists[i]);
        toExport.push(obj);
      }
    }

    const file = new File(
      [JSON.stringify(toExport)],
      `backup-${new Date().toLocaleDateString()}.json`,
      {type: "application/json;charset=utf-8"}
    );

    saveAs(file);
  },

  importPlaylists(data) {
    const json = JSON.parse(data);
    const user_id = auth.getUserId();

    json.forEach(async (item) => {
      const uris = item.tracks.map(el => el.track.uri);
      const response = await api.createPlaylist(user_id, item.name);

      await api.addTracksToPlaylist(response.data.id, uris);
    })
  },

  async doImport() {
    console.info('doImport');
  },

  async doExport() {
    console.info('doExport');
  }
};

export default exporter;
