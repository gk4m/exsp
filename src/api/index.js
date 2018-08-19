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
};


