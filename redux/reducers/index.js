import { combineReducers } from 'redux';

import { updateTheme } from './themeReducers';

import {
  getAllPlaylistsReducer,
  getPlaylistItemsReducer
} from './playlistReducers';


import {
  getYoutubeResultsReducer,
} from './youtubeReducers';

import {
  setAccessToken
} from './userReducers';

const reducers = combineReducers({
  theme: updateTheme,

  playlists: getAllPlaylistsReducer,
  playlistItems: getPlaylistItemsReducer,

  youtubeResults: getYoutubeResultsReducer,

  accessToken: setAccessToken
});

export default reducers;
