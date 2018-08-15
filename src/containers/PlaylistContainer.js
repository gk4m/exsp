import React, {Component} from 'react';
import Playlist from '../components/Playlist'
import api from '../api'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)

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
        offset,
        items
      } = this.state;

      if (total > offset) {
        const response = await api.getUserPlaylists(limit, offset);

        this.setState({
          offset: response.data.offset + limit,
          total: response.data.total
        });

        items.push(...response.data.items);
        this.fetchPlaylist();
      }

    } catch (e) {
      console.log(e)
    }
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.fetchPlaylist();
  }

  render() {
    return (
      <div>
        <Playlist/>
      </div>
    );
  }
}

export default PlaylistContainer;
