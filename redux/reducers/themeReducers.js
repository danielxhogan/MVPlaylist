import {
  UPDATE_THEME_DARK,
  UPDATE_THEME_LIGHT,
  DARK
} from '../types/themeTypes';

let theme;

if (localStorage) {
   theme = localStorage.getItem('theme');
} else {
   theme = DARK;
}


export const updateTheme = (state=theme, action) => {

  switch (action.type) {

    case UPDATE_THEME_LIGHT:
      return action.payload;

    case UPDATE_THEME_DARK:
      return action.payload;

    default:
      return state;
  }
};