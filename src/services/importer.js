import api from '../api'
import auth from './auth'
import {ResourceType} from './data/ResourceType'

const importer  = {

  _importPlaylists(data) {
    const json = JSON.parse(data);
    const user_id = auth.getUserId();

    json.forEach(async (item) => {
      const uris = item.tracks.map(el => el.track.uri);
      const response = await api.createPlaylist(user_id, item.name);

      await api.addTracksToPlaylist(response.data.id, uris);
    })
  },

  _importAlbum(data) {
    //@todo _importAlbum
  },

  _importArtists(data) {
    //@todo _importArtists
  },


  async doImport(data, type) {
    console.info('doImport');

    switch (type) {
      case ResourceType.PLAYLIST:
        this._importPlaylists(data);
        break;
      case ResourceType.ALBUM:
        this._importAlbum(data);
        break;
      case ResourceType.ARTIST:
        this._importArtists(data);
        break;
      default:
        break;
    }
  },
};

export default importer;
