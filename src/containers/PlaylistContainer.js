import React, {Component, Fragment} from 'react';
import Playlist from '../components/Playlist'
import api from '../api'
import ExporterService from '../services/exporter'
import LinearProgress from '@material-ui/core/LinearProgress';

class PlaylistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 50,
      offset: 0,
      total: 1,
      items: [],
      progress: 0,
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
    ExporterService.exportPlaylists(this.state.items, (progress) => {
      this.setState({progress: progress});

      if (progress === 100) {
        setTimeout(() => {
          this.setState({progress: 0});
        }, 5000)
      }
    });
  }

  componentWillMount() {
    this.fetchPlaylist();
  }

  render() {
    const {
      items,
      progress,
    } = this.state;

    return (
      <Fragment>

        {progress > 0 && (
          <LinearProgress color="primary" variant="determinate" value={progress}/>
        )}

        <Playlist
          items={items}
          handleExportClick={() => this.handleExportClick()}
        />
      </Fragment>
    );

  }
}

export default PlaylistContainer;
