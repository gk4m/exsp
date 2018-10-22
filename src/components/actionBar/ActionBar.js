import React, {Component} from 'react';
import {toastr} from 'react-redux-toastr'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export class ActionBar extends Component {

  async componentDidUpdate(prevProps) {
    const {
      imported,
      fetchPlaylists,
      fetchArtists,
      fetchAlbums,
    } = this.props;
    const {imported: prevImported} = prevProps;

    if (!imported.isLoading && prevImported.isLoading) {
      if (imported.failure) {
        toastr.error('Error', imported.data);
      } else {
        toastr.success('Imported!', 'File has been imported correctly.');

        setTimeout(() => {
          fetchAlbums();
          fetchPlaylists();
          fetchArtists();
        }, 500);
      }
    }
  }

  handleImportChange = (event) => {
    const {doImport} = this.props;

    const {files} = event.target;
    const reader = new FileReader();

    reader.readAsText(files[0], 'UTF-8');

    reader.onload = (evt) => {
      try {
        doImport(evt.target.result);
      } catch (e) {
        console.error(e);
      }
    };

    reader.onerror = () => {
      toastr.error('Error', 'Error on file import!');
    }
  };

  render() {
    return (
      <div>
        <label htmlFor="import-file">
          <Button
            variant="contained"
            color="primary"
            component="span" style={{marginTop: '10px'}}>
            Import
          </Button>
          <input
            accept=".json"
            onChange={this.handleImportChange}
            id="import-file"
            type="file"
            style={{display: 'none'}}
          />
        </label>
      </div>
    );
  }
}

ActionBar.propTypes = {
  fetchPlaylists: PropTypes.func.isRequired,
  fetchArtists: PropTypes.func.isRequired,
  fetchAlbums: PropTypes.func.isRequired,
};

