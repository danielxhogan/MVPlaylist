import {
  GET_ALL_PLAYLISTS_LOADING,
  GET_ALL_PLAYLISTS_200,
  GET_ALL_PLAYLISTS_401,
  GET_ALL_PLAYLISTS_403,
  GET_ALL_PLAYLISTS_429,
  GET_ALL_PLAYLISTS_500,

  GET_PLAYLIST_ITEMS_LOADING,
  GET_PLAYLIST_ITEMS_200,
  GET_PLAYLIST_ITEMS_401,
  GET_PLAYLIST_ITEMS_403,
  GET_PLAYLIST_ITEMS_429,
  GET_PLAYLIST_ITEMS_500,
} from '../types/playlistTypes';

export const getAllPlaylistsReducer = (state={}, action) => {
  switch (action.type) {

    case GET_ALL_PLAYLISTS_LOADING:
      return {
        loading: true
      }

    case GET_ALL_PLAYLISTS_200:
      return action.payload;

    case GET_ALL_PLAYLISTS_401:
      return {
        loading: true,
        error: action.payload
      };

    case GET_ALL_PLAYLISTS_403:
      return action.payload;

    case GET_ALL_PLAYLISTS_429:
      return action.payload;

    case GET_ALL_PLAYLISTS_500:
      return action.payload;

    default:
      return state;
  }
};

export const getPlaylistItemsReducer = (state={}, action) => {
  switch (action.type) {

    case GET_PLAYLIST_ITEMS_LOADING:
      return {
        loading: true
      }

    case GET_PLAYLIST_ITEMS_200:
      return action.payload;

    case GET_PLAYLIST_ITEMS_401:
      return {
        loading: true,
        error: action.payload
      };

    case GET_PLAYLIST_ITEMS_403:
      return action.payload;

    case GET_PLAYLIST_ITEMS_429:
      return action.payload;

    case GET_PLAYLIST_ITEMS_500:
      return action.payload;

    default:
      return state;
  }
};