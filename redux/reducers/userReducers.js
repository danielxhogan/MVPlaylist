import {
  SET_ACCESS_TOKEN
} from '../types/userTypes';

export const setAccessToken = (state='', action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return action.payload;

    default:
      return state;
  };
};