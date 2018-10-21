import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { Playlist } from './Playlist';

const mapStateToProps = state => {
  return {
    playlists: state.playlist.playlists
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const PlaylistContainer = connect(mapStateToProps, mapDispatchToProps)(Playlist);
