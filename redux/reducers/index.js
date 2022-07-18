import { combineReducers } from 'redux';

import { updateTheme } from './themeReducers';

import {
  getAllPlaylistsReducer,
  getPlaylistItemsReducer
} from './playlistReducers';

import {
  setAccessToken
} from './userReducers';

const reducers = combineReducers({
  theme: updateTheme,

  playlists: getAllPlaylistsReducer,
  playlistItems: getPlaylistItemsReducer,

  accessToken: setAccessToken
});

export default reducers;