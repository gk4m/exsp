import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { Song } from './Song';

const mapStateToProps = state => ({
  songs: state.song.songs,
  actionExport: state.action.export,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const SongContainer = connect(mapStateToProps, mapDispatchToProps)(Song);
