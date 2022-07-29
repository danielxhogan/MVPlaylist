import { combineReducers } from 'redux';

import { updateTheme } from './themeReducers';

import {
  getAllPlaylistsReducer,
  getPlaylistItemsReducer
} from './playlistReducers';


import {
  getYoutubeResultsReducer,
  addVideoReducer,
  getVideosReducer
} from './youtubeReducers';

import {
  setAccessToken
} from './userReducers';

const reducers = combineReducers({
  theme: updateTheme,

  playlists: getAllPlaylistsReducer,
  playlistItems: getPlaylistItemsReducer,

  youtubeResults: getYoutubeResultsReducer,
  addVideoStatus: addVideoReducer,
  videos: getVideosReducer,

  accessToken: setAccessToken
});

export default reducers;
