import { combineReducers } from 'redux';

import { updateTheme } from './themeReducers';

const reducers = combineReducers({
  theme: updateTheme
});

export default reducers;