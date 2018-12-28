import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { Album } from './Album';

const mapStateToProps = state => {
  return {
    albums: state.album.albums,
    actionExport: state.action.export,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const AlbumContainer = connect(mapStateToProps, mapDispatchToProps)(Album);
