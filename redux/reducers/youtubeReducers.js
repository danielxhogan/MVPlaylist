import {
  GET_YOUTUBE_RESULTS_LOADING,
  GET_YOUTUBE_RESULTS_200,
  GET_YOUTUBE_RESULTS_400,
  GET_YOUTUBE_RESULTS_500,
  GET_YOUTUBE_RESULTS_REFRESH,

  ADD_VIDEO_200,
  ADD_VIDEO_500,
  ADD_VIDEO_REFRESH,

  GET_VIDEOS_200,
  GET_VIDEOS_404,
  PLAY_VIDEO,
  PLAY_VIDEO_REFRESH
} from '../types/youtubeTypes';


export const getYoutubeResultsReducer = (state={}, action) => {
  switch (action.type) {

    case GET_YOUTUBE_RESULTS_LOADING:
      return {
        loading: true
      };

    case GET_YOUTUBE_RESULTS_200:
      return {
        data: action.payload.data,
        query: action.payload.query,
        songId: action.payload.songId
      };

    case GET_YOUTUBE_RESULTS_400:
      return {
        loading: true,
        error: action.payload
      };

    case GET_YOUTUBE_RESULTS_500:
      return action.payload;

    case GET_YOUTUBE_RESULTS_REFRESH:
      return {
        refresh: true
      };

    default:
      return state;
  };
};

export const addVideoReducer = (state={}, action) => {
  switch (action.type) {

    case ADD_VIDEO_200:
      return {
        success: true,
        error: false
      };

    case ADD_VIDEO_500:
      return {
        success: false,
        error: true
      };
  
    case ADD_VIDEO_REFRESH:
      return {
        success: false,
        error: false
      };

    default:
      return state;
  };
};

export const getVideosReducer = (state=[], action) => {
  switch (action.type) {

    case GET_VIDEOS_200:
      return action.payload.songs;

    case GET_VIDEOS_404:
      return {
        success: false,
        error: action.payload
      };

    default:
      return state;
  };
};

export const playVideoReducer = (state={}, action) => {
  switch (action.type) {

    case PLAY_VIDEO:
      return {
        videoId: action.payload
      };

    case PLAY_VIDEO_REFRESH:
      return {
        refresh: true,
      };

    default:
      return state;
  };
};
