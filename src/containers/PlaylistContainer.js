import React, {Component} from 'react';
import Playlist from '../components/Playlist'
import api from '../api'
import ExporterService from '../services/exporter'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 50,
      offset: 0,
      total: 1,
      items: []
    }
  }

  async fetchPlaylist() {
    try {
      const {
        limit,
        total,
        offset
      } = this.state;

      if (total > offset) {
        const response = await api.getUserPlaylists(limit, offset);

        this.setState(prevState => ({
          offset: response.data.offset + limit,
          total: response.data.total,
          items: [...prevState.items, ...response.data.items]
        }));

        this.fetchPlaylist();
      }

    } catch (e) {
      console.log(e)
    }
  }

  handleExportClick() {
    ExporterService.exportPlaylists(this.state.items);
  }

  componentWillMount() {
    this.fetchPlaylist();
  }

  render() {
    const {
      items
    } = this.state;

    return (
      <div>
        <Playlist
          items={items}
          handleExportClick={() => this.handleExportClick()}
        />
      </div>
    );

  }
}

export default PlaylistContainer;
