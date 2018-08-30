import request from './request'

export default {
  getUserPlaylists(limit, offset) {
    return request.get('me/playlists', {
      params: {
        limit,
        offset
      }
    });
  },

  getPlaylistTracks(user_id, playlist_id, offset, limit, fields) {
    return request.get(`users/${user_id}/playlists/${playlist_id}/tracks`, {
      params: {
        fields,
        limit,
        offset
      }
    });
  },

  getUserProfile(userID) {
    return userID ? request.get(`users/${userID}`) : request.get('me')
  },

  createPlaylist(user_id, name, description) {
    return request.post(`users/${user_id}/playlists`, {
      name,
      description
    });
  },

  addTracksToPlaylist(playlist_id, uris) {
    return request.post(`playlists/${playlist_id}/tracks`, {
      uris,
    });
  },
};


