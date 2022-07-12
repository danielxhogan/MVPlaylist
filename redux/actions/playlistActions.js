import axios from 'axios';

import {
  GET_ALL_PLAYLISTS_200,
  GET_ALL_PLAYLISTS_401,
  GET_ALL_PLAYLISTS_403,
  GET_ALL_PLAYLISTS_429,
  GET_ALL_PLAYLISTS_500,
} from '../types/playlistTypes';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

export const getAllPlaylistsAction = (req, accessToken) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    };

    const url = `${SPOTIFY_BASE_URL}/me/playlists`;
    const response = await axios.get(url, config);
    
    console.log(`response.status: ${response.status}`);
    console.log(`response.data: ${response.data}`);
  
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
}