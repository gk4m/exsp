import { toastr } from 'react-redux-toastr';
import { waitFor, asyncForEach } from '../utils';
import api from '../api';
import auth from './auth';

const importer = {

  _chunk(arr, chunkSize) {
    const result = [];

    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  },

  async _importPlaylists(data) {
    const userId = auth.getUserId();

    await asyncForEach(data, async (playlist) => {
      const uris = playlist.tracks.map(el => el.track.uri);
      const response = await api.createPlaylist(userId, playlist.name);

      this._chunk(uris, 100).forEach(async (item) => {
        await api.addTracksToPlaylist(response.data.id, item);
      });

      await waitFor(500);
    });
  },

  async _importAlbum(data) {
    this._chunk(data, 50).forEach(async (item) => {
      await api.saveAlbums(item);
    });
  },

  async _importArtists(data) {
    this._chunk(data, 50).forEach(async (item) => {
      await api.follow('artist', item);
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
        await this._importPlaylists(playlists);
      }

      if (albums) {
        await this._importAlbum(albums);
      }

      if (artists) {
        await this._importArtists(artists);
      }

      toastr.success('Imported!', 'File has been imported correctly.');
    } catch (e) {
      toastr.error('Error', 'Imported file is incorrect!. Please try again.');
    }
  },
};

export default importer;
