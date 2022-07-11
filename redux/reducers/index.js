import { combineReducers } from 'redux';

import { updateTheme } from './themeReducers';

import { getAllPlaylistsReducer } from './playlistReducers';

const reducers = combineReducers({
  theme: updateTheme,

  playlists: getAllPlaylistsReducer
});

export default reducers;