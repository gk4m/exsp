import React, {Component} from 'react';
import ActionBar from '../components/ActionBar';
import ImporterService from '../services/importer'

class AppContainer extends Component {

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
      <ActionBar
        handleImportChange={this.handleImportChange}
      />
    );
  }
}

export default AppContainer;
