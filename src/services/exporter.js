import {saveAs} from 'file-saver/FileSaver';
import {ResourceType} from './types/ResourceType'
import Repository from './repository'

const exporter  = {

  _saveAs(data) {
    const file = new File(
      [JSON.stringify(data)],
      `backup-${new Date().toLocaleDateString()}.json`,
      {type: "application/json;charset=utf-8"}
    );

    saveAs(file);
  },

  async _getPlaylistObject(playlist) {
    const response = await Repository.fetchPlaylistTracks(playlist.owner.id, playlist.id);

    return {
      name: playlist.name,
      public: playlist.public,
      tracks: response.items,
    };
  },

  async _exportPlaylists(selectedPlaylist) {
    const toExport = [];
    const {items: playlists} = await Repository.fetchPlaylists();

    for (let i = 0, len = playlists.length; i < len; i++) {
      if(selectedPlaylist.indexOf(playlists[i].id) > -1) {
        const obj = await this._getPlaylistObject(playlists[i]);
        toExport.push(obj);
      }
    }

    exporter._saveAs({playlists: toExport});
  },

  _exportAlbums(selected) {
    const toExport = {};

    toExport.albums = selected;

    exporter._saveAs({albums: toExport});
  },

  _exportArtists(selected) {
    const toExport = {};

    toExport.artists = selected;

    exporter._saveAs({artists: toExport});
  },

  async doExport(selected, type) {
    if (!selected.length) return;

    switch (type) {
      case ResourceType.PLAYLIST:
        this._exportPlaylists(selected);
        break;
      case ResourceType.ALBUM:
        this._exportAlbums(selected);
        break;
      case ResourceType.ARTIST:
        this._exportArtists(selected);
        break;
      default:
        break;
    }
  }
};

export default exporter;
