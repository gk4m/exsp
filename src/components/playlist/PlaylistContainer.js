import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { Playlist } from './Playlist';
import { doExport } from '../actionBar/actions';

const mapStateToProps = state => ({
  playlists: state.playlist.playlists,
  actionExport: state.action.export,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions, doExport }, dispatch);

export const PlaylistContainer = connect(mapStateToProps, mapDispatchToProps)(Playlist);
