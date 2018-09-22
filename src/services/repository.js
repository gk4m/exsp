import api from '../api'
import {getParameterByName} from '../utils'

const repository  = {

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
};

export default repository;
