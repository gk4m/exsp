import request from './request'

export default {
  getUserPlaylists(offset, limit) {
    return request.get('me/playlists', {
      params: {
        offset,
        limit
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

  getTracks(offset, limit, market) {
    return request.get('me/tracks', {
      params: {
        limit,
        offset,
        market
      }
    });
  },

  getAlbums(offset, limit, market) {
    return request.get('me/albums', {
      params: {
        limit,
        offset,
        market
      }
    });
  },

  getFollowedArtists(limit, after) {
    return request.get(`me/following?type=artist`, {
      params: {
        limit,
        after
      }
    });
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


