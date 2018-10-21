import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { fetchPlaylists } from '@/components/playlist/actions';

import { ActionBar } from './ActionBar';

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...actions,
    fetchPlaylists,
  },
  dispatch
);

export const ActionBarContainer = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
