import { combineReducers } from 'redux';

import { updateTheme } from './themeReducers';

import {
  getAllPlaylistsReducer,
  getPlaylistItemsReducer
} from './playlistReducers';

const reducers = combineReducers({
  theme: updateTheme,

  playlists: getAllPlaylistsReducer,
  playlistItems: getPlaylistItemsReducer
});

export default reducers;