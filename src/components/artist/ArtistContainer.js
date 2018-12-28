import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { Artist } from './Artist';

const mapStateToProps = state => {
  return {
    artists: state.artist.artists,
    actionExport: state.action.export,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const ArtistContainer = connect(mapStateToProps, mapDispatchToProps)(Artist);
