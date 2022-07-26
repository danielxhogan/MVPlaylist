import {
  GET_YOUTUBE_RESULTS_LOADING,
  GET_YOUTUBE_RESULTS_200,
  GET_YOUTUBE_RESULTS_400,
  GET_YOUTUBE_RESULTS_500,
} from '../types/youtubeTypes';


export const getYoutubeResultsReducer = (state={}, action) => {
  switch (action.type) {

    case GET_YOUTUBE_RESULTS_LOADING:
      return {
        loading: true
      }

    case GET_YOUTUBE_RESULTS_200:
     return {
       data: action.payload.data,
       query: action.payload.query
     }

    case GET_YOUTUBE_RESULTS_400:
      return {
        loading: true,
        error: action.payload
      };
  
    case GET_YOUTUBE_RESULTS_500:
      return action.payload;

    default:
      return state;
  }
}
