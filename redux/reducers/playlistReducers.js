import {
  GET_ALL_PLAYLISTS_200,
  GET_ALL_PLAYLISTS_401,
  GET_ALL_PLAYLISTS_403,
  GET_ALL_PLAYLISTS_429,
  GET_ALL_PLAYLISTS_500,
} from '../types/playlistTypes';

export const getAllPlaylistsReducer = (state={}, action) => {
  switch (action.type) {
    case GET_ALL_PLAYLISTS_200:
      return action.payload;

    case GET_ALL_PLAYLISTS_401:
      return action.payload;

    case GET_ALL_PLAYLISTS_403:
      return action.payload;

    case GET_ALL_PLAYLISTS_429:
      return action.payload;

    case GET_ALL_PLAYLISTS_500:
      return action.payload;

    default:
      return state;
  }
}