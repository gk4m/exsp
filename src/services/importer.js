import api from '../api'
import auth from './auth'

const importer = {

  _chunk(arr, chunkSize) {
    let result = [];

    for (let i = 0, len = arr.length; i < len; i += chunkSize){
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  },

  _importPlaylists(data) {
    const user_id = auth.getUserId();

    data.forEach(async (item) => {
       const uris = item.tracks.map(el => el.track.uri);

       //@todo handle if 503 occurred
       const response = await api.createPlaylist(user_id, item.name);

       //You can add a maximum of 100 tracks per request.
       this._chunk(uris, 100).forEach(async (item) => {
         await api.addTracksToPlaylist(response.data.id, item);
       });
    })
  },

  _importAlbum(data) {
    //@todo _importAlbum
  },

  _importArtists(data) {
    //@todo _importArtists
  },

  async doImport(json) {
    const data = JSON.parse(json);
    const {
      playlists,
      albums,
      artists,
    } = data;

    if (playlists) {
      this._importPlaylists(playlists)
    }

    if (albums) {
      this._importAlbum(albums);
    }

    if (artists) {
      this._importArtists(artists);
    }
  },
};

export default importer;
