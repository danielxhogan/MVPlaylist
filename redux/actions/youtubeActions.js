import axios from 'axios';

import {
  GET_YOUTUBE_RESULTS_LOADING,
  GET_YOUTUBE_RESULTS_200,
  GET_YOUTUBE_RESULTS_400,
  GET_YOUTUBE_RESULTS_500,
} from '../types/youtubeTypes';

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
// const KEY = process.env.YOUTUBE_API_KEY;
const KEY = 'AIzaSyCAw2xACgUNyRdIH2KMgOnktj5o9Sfc6Os';

export const getYoutubeResultsAction = (searchTerm) => async (dispatch) => {
  try {
    dispatch({ type: GET_YOUTUBE_RESULTS_LOADING });

    const q = `q=${searchTerm}`;
    const key = `key=${KEY}`;
    const part = 'part=snippet';
    const type = 'type=video';
    const maxResults = 'maxResults=5';
    const params = `${q}&${key}&${part}&${type}&${maxResults}`;
    const url = `${YOUTUBE_BASE_URL}?${params}`;
    console.log(`url: ${url}`);
    console.log(`url: ${url}`);
    const response = await axios.get(url);

    if (response.status === 200) {
      console.log(`response.status: ${response.status}`);

      dispatch({
        type: GET_YOUTUBE_RESULTS_200,
        payload: {
          data: response.data,
          query: searchTerm
        }
      });
    }
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
    }
  }
}
