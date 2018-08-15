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
};


