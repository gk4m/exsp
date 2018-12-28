import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { fetchPlaylists } from '@/components/playlist/actions';
import { fetchAlbums } from '@/components/album/actions';
import { fetchArtists } from '@/components/artist/actions';

import { ActionBar } from './ActionBar';

const mapStateToProps = state => {
  return {
    actionImport: state.action.import,
    actionExport: state.action.export,
    albums: state.album.albums,
    playlists: state.playlist.playlists,
    artists: state.artist.artists,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...actions,
    fetchPlaylists,
    fetchArtists,
    fetchAlbums,
  },
  dispatch
);

export const ActionBarContainer = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
