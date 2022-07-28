import axios from 'axios';

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

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

export const getAllPlaylistsAction = (accessToken, offset=0) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PLAYLISTS_LOADING });
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const url = `${SPOTIFY_BASE_URL}/me/playlists?limit=50&offset=${offset}`;
    const response = await axios.get(url, config);
  
    if (response.status === 200) {
      dispatch({
        type: GET_ALL_PLAYLISTS_200,
        payload: response.data
      });
    }

  } catch (err) {
    console.log(`getAllPlaylistsAction error: ${err.message}`);

    if (err.response.status === 401) {
      dispatch({
        type: GET_ALL_PLAYLISTS_401,
        payload: {
          status: err.response.status,
          message: err.message
        }
      });

    } else if (err.response.status === 403) {
      dispatch({
        type: GET_ALL_PLAYLISTS_403,
        payload: {
          status: err.response.status,
          message: err.message
        }
      });

    } else if (err.response.status === 429) {
      dispatch({
        type: GET_ALL_PLAYLISTS_429,
        payload: {
          status: err.response.status,
          message: err.message
        }
      });

    } else {
      dispatch({
        type: GET_ALL_PLAYLISTS_500,
        payload: err.message
      });
    }
  }
};

export const getPlaylistItemsAction = (accessToken, playlistId, offset=0) => async (dispatch) => {
  try {
    dispatch({ type: GET_PLAYLIST_ITEMS_LOADING });
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const url = `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks?limit=50&offset=${offset}`;
    const response = await axios.get(url, config);
  
    if (response.status === 200) {
      dispatch({
        type: GET_PLAYLIST_ITEMS_200,
        payload: response.data
      });
    }
  
  } catch (err) {
    console.log(`getAllPlaylistsAction error: ${err.message}`);

    if (err.response.status === 401) {
      dispatch({
        type: GET_PLAYLIST_ITEMS_401,
        payload: {
          status: err.response.status,
          message: err.message
        }
      });

    } else if (err.response.status === 403) {
      dispatch({
        type: GET_PLAYLIST_ITEMS_403,
        payload: {
          status: err.response.status,
          message: err.message
        }
      });

    } else if (err.response.status === 429) {
      dispatch({
        type: GET_PLAYLIST_ITEMS_429,
        payload: {
          status: err.response.status,
          message: err.message
        }
      });

    } else {
      dispatch({
        type: GET_PLAYLIST_ITEMS_500,
        payload: err.message
      });
    }
  }
};
