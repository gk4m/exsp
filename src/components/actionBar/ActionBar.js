import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ImporterService from '@/services/importer'

export class ActionBar extends Component {

  handleImportChange = (event) => {
    const {files} = event.target;
    const reader = new FileReader();

    reader.readAsText(files[0], 'UTF-8');

    reader.onload = (evt) => {
      ImporterService.doImport(evt.target.result)
    };

    reader.onerror = () => {
      console.error('Error on file import!')
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
};

