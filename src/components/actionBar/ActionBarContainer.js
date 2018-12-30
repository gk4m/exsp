import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { fetchSongs } from '@/components/song/actions';
import { fetchPlaylists } from '@/components/playlist/actions';
import { fetchAlbums } from '@/components/album/actions';
import { fetchArtists } from '@/components/artist/actions';

import { ActionBar } from './ActionBar';

const mapStateToProps = state => ({
  actionImport: state.action.import,
  actionExport: state.action.export,
  songs: state.song.songs,
  albums: state.album.albums,
  artists: state.artist.artists,
  playlists: state.playlist.playlists,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...actions,
    fetchSongs,
    fetchPlaylists,
    fetchArtists,
    fetchAlbums,
  },
  dispatch,
);

export const ActionBarContainer = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
