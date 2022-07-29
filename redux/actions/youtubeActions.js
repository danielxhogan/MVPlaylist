import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import {
  GET_YOUTUBE_RESULTS_LOADING,
  GET_YOUTUBE_RESULTS_200,
  GET_YOUTUBE_RESULTS_400,
  GET_YOUTUBE_RESULTS_500,

  ADD_VIDEO_200,
  ADD_VIDEO_500,

  GET_VIDEOS_200,
  GET_VIDEOS_404
} from '../types/youtubeTypes';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
// const KEY = process.env.YOUTUBE_API_KEY;
const KEY = 'AIzaSyCAw2xACgUNyRdIH2KMgOnktj5o9Sfc6Os';

export const getYoutubeResultsAction = (
  searchTerm,
  songId
) => async (dispatch) => {
  try {
    dispatch({ type: GET_YOUTUBE_RESULTS_LOADING });

    const q = `q=${searchTerm}`;
    const key = `key=${KEY}`;
    const part = 'part=snippet';
    const type = 'type=video';
    const maxResults = 'maxResults=5';
    const params = `${q}&${key}&${part}&${type}&${maxResults}`;

    const url = `${YOUTUBE_BASE_URL}?${params}`;
    const response = await axios.get(url);

    if (response.status === 200) {
      console.log(`response.status: ${response.status}`);

      dispatch({
        type: GET_YOUTUBE_RESULTS_200,
        payload: {
          data: response.data,
          query: searchTerm,
          songId
        }
      });
    };
  } catch (err) {
    console.log(`getYoutubeResultsAction error: ${err.message}`);

    if (err.response && err.response.status === 400) {
      console.log(`err.response.status: ${err.response.status}`);
      dispatch({
        type: GET_YOUTUBE_RESULTS_400,
        payload: {
          status: err.response.status,
          message: err.message
        }
      });

    } else {
      dispatch({
        type: GET_YOUTUBE_RESULTS_500,
        payload: err.message
      });
    };
  };
};

export const addVideoAction = (
  userId,
  playlistId,
  songId,
  videoId
) => async (dispatch) => {
  try {
    console.log(`songId: ${songId}`);
    console.log(`videoId: ${videoId}`);
    console.log(`playlistId: ${playlistId}`);

    const body = {
      userId,
      playlistId,
      songId,
      videoId
    };

    const apiConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/yt/addvideo', body, apiConfig);
    console.log(`addVideoAction res: ${res}`);

    if (res.status === 200) {
      dispatch({ type: ADD_VIDEO_200 });
    };

  } catch (err) {
    console.log(`getYoutubeResultsAction error: ${err.message}`);
    dispatch({ type: ADD_VIDEO_500 });
  };
};

export const getVideosAction = (
  req,
  userId,
  playlistId,
) => async (dispatch) => {
  try {
    const { origin } = absoluteUrl(req);
    const params = `userId=${userId}&playlistId=${playlistId}`;
    const url = `${origin}/api/yt/getvideos?${params}`;
//    const url = `/api/yt/getvideos?${params}`;
    const res = await axios.get(url);

    if (res.status === 200) {
      dispatch({
        type: GET_VIDEOS_200,
        payload: res.data
      });
    };

  } catch (err) {
    console.log(`getVideosAction error: ${err.message}`);

    if (err.status === 404) {
      dispatch({
        type: GET_VIDEOS_404,
        payload: {
          status: err.response.status,
          data: err.response.data
        }
      });
    };
  };
};
