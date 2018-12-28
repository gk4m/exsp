import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import api from '../../api';

export class ActionBar extends Component {
  async componentDidUpdate(prevProps) {
    const {
      actionImport,
      fetchPlaylists,
      fetchArtists,
      fetchAlbums,
    } = this.props;

    const { actionImport: prevActionImport } = prevProps;

    if (!actionImport.isLoading && prevActionImport.isLoading && !actionImport.failure) {
      setTimeout(() => {
        fetchAlbums();
        fetchPlaylists();
        fetchArtists();
      }, 500);
    }
  }

  handleImportChange = (event) => {
    const { doImport } = this.props;
    const { files } = event.target;
    const reader = new FileReader();

    reader.readAsText(files[0], 'UTF-8');

    reader.onload = (evt) => {
      doImport(evt.target.result);
    };

    reader.onerror = () => {
      toastr.error('Error', 'Error on file import!');
    };
  };

  handleExportClick = () => {
    const {
      playlists,
      albums,
      artists,
      doExport,
    } = this.props;

    const playlistsIds = playlists.data.items.map(item => item.id);
    const albumsIds = albums.data.items.map(item => item.album.id);
    const artistsIds = artists.data.items.map(item => item.id);

    doExport({
      playlists: playlistsIds,
      albums: albumsIds,
      artists: artistsIds,
    });
  };

  handleRemoveClick = () => {
    // temporary function for test
    const {
      playlists,
    } = this.props;

    const playlistsIds = playlists.data.items.map(item => item.id);

    playlistsIds.forEach(async (item) => {
      await api.unfollowPlaylist(item);
    });
  };

  render() {
    const {
      actionExport,
      actionImport,
    } = this.props;

    return (
      <div>
        <label htmlFor="import-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            disabled={actionImport.isLoading}
          >
            Import
          </Button>

          {!actionImport.isLoading && (
            <input
              onChange={this.handleImportChange}
              accept=".json"
              id="import-file"
              type="file"
              style={{ display: 'none' }}
            />
          )}
        </label>

        <Button
          onClick={this.handleExportClick}
          variant="contained"
          color="primary"
          component="span"
          style={{ marginLeft: '10px' }}
          disabled={actionExport.isLoading}
        >
          Export
        </Button>
        {/* <Button */}
        {/* onClick={this.handleRemoveClick} */}
        {/* variant="contained" */}
        {/* color="primary" */}
        {/* component="span" style={{marginLeft: '10px'}} */}
        {/* > */}
        {/* remove */}
        {/* </Button> */}
      </div>
    );
  }
}

ActionBar.propTypes = {
  doImport: PropTypes.func.isRequired,
  doExport: PropTypes.func.isRequired,
  albums: PropTypes.object.isRequired,
  playlists: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  fetchPlaylists: PropTypes.func.isRequired,
  fetchArtists: PropTypes.func.isRequired,
  fetchAlbums: PropTypes.func.isRequired,
  actionImport: PropTypes.object.isRequired,
  actionExport: PropTypes.object.isRequired,
};
