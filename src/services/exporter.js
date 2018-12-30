import { saveAs } from 'file-saver/FileSaver';
import { toastr } from 'react-redux-toastr';
import { ResourceType } from './constants/ResourceType';
import Repository from './repository';

const exporter = {

  _saveAs(data, name = 'backup') {
    const file = new File(
      [JSON.stringify(data)],
      `${name}-${new Date().toLocaleDateString()}.json`,
      { type: 'application/json;charset=utf-8' },
    );

    return saveAs(file);
  },

  async _getPlaylistObject(playlist) {
    const response = await Repository.fetchPlaylistTracks(playlist.owner.id, playlist.id);

    return {
      name: playlist.name,
      public: playlist.public,
      tracks: response.items,
    };
  },

  async _getPlaylistsWithDetails(playlists, selectedPlaylist) {
    const result = [];

    for (let i = 0, len = playlists.length; i < len; i++) {
      if (selectedPlaylist.indexOf(playlists[i].id) > -1) {
        /* eslint-disable-next-line no-await-in-loop */
        const obj = await this._getPlaylistObject(playlists[i]);
        result.push(obj);
      }
    }

    return result;
  },

  async _exportPlaylists(selectedPlaylist) {
    const { items: playlists } = await Repository.fetchPlaylists();

    const toExport = {
      playlists: await this._getPlaylistsWithDetails(playlists, selectedPlaylist),
    };

    await exporter._saveAs(toExport, 'playlists-backup');
  },

  async _exportSongs(selected) {
    const toExport = {};

    toExport.songs = selected;

    await exporter._saveAs(toExport, 'songs-backup');
  },

  async _exportAlbums(selected) {
    const toExport = {};

    toExport.albums = selected;

    await exporter._saveAs(toExport, 'albums-backup');
  },

  async _exportArtists(selected) {
    const toExport = {};

    toExport.artists = selected;

    await exporter._saveAs(toExport, 'artists-backup');
  },

  async _exportAll(selected) {
    const { items: playlists } = await Repository.fetchPlaylists();

    const toExport = {
      ...selected,
      playlists: await this._getPlaylistsWithDetails(playlists, selected.playlists),
    };

    await exporter._saveAs(toExport, 'spotify-backup');
  },

  async doExport(selected, type) {
    let result = null;

    try {
      switch (type) {
        case ResourceType.SONG:
          result = await this._exportSongs(selected);
          break;
        case ResourceType.PLAYLIST:
          result = await this._exportPlaylists(selected);
          break;
        case ResourceType.ALBUM:
          result = await this._exportAlbums(selected);
          break;
        case ResourceType.ARTIST:
          result = await this._exportArtists(selected);
          break;
        default:
          result = await this._exportAll(selected);
          break;
      }
      toastr.success('Exported!', 'Export has been ran correctly.');
      return result;
    } catch (e) {
      toastr.error('Error', 'Something goes wrong. Please try again.');
    }

    return result;
  },
};

export default exporter;
