import api from '../api'
import auth from './auth'

const importer = {

  _chunk(arr, chunkSize) {
    let result = [];

    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  },

  _importPlaylists(data) {
    const user_id = auth.getUserId();

    data.forEach(async (item) => {
      const uris = item.tracks.map(el => el.track.uri);

      const response = await api.createPlaylist(user_id, item.name);

      this._chunk(uris, 100).forEach(async (item) => {
        await api.addTracksToPlaylist(response.data.id, item);
      });
    })
  },

  _importAlbum(data) {
    this._chunk(data, 50).forEach(async (item) => {
      await api.saveAlbums(item)
    });
  },

  _importArtists(data) {
    this._chunk(data, 50).forEach(async (item) => {
      await api.follow('artist', item)
    });
  },

  async doImport(json) {
    try {
      const data = JSON.parse(json);
      const {
        playlists,
        albums,
        artists,
      } = data;

      if (playlists) {
        return this._importPlaylists(playlists)
      }

      if (albums) {
        return this._importAlbum(albums);
      }

      if (artists) {
        return this._importArtists(artists);
      }
    } catch (e) {
      return Promise.reject('Imported file is incorrect!')
    }
  },
};

export default importer;
