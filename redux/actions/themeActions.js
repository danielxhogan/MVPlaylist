import {
  UPDATE_THEME_DARK,
  UPDATE_THEME_LIGHT,
  DARK,
  LIGHT,
} from '../types/themeTypes';

export const updateThemeLight = () => async (dispatch) => {
  dispatch ({
    type: UPDATE_THEME_LIGHT,
    payload: LIGHT
  })
};

export const updateThemeDark = () => async (dispatch) => {
  dispatch ({
    type: UPDATE_THEME_DARK,
    payload: DARK
  })
};