import React, {Component, Fragment} from 'react';
import PlaylistTable from '../components/PlaylistTable'
import ExporterService from '../services/exporter'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      progress: 0,
    };
  }

  handleExportClick = (selected) => {
    ExporterService.exportPlaylists(selected);
  };

  async componentWillMount() {
    const response = await ExporterService.fetchPlaylists();

    this.setState({
      items: [...response.items]
    });
  }

  render() {
    const {
      items,
    } = this.state;

    return (
      <Fragment>

        <PlaylistTable
          items={items}
          handleExportClick={this.handleExportClick}
        />
      </Fragment>
    );

  }
}

export default PlaylistContainer;
