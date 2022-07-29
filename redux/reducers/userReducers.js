import {
  SET_ACCESS_TOKEN,
  SET_USER_ID
} from '../types/userTypes';

export const setAccessToken = (state='', action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return action.payload;

    default:
      return state;
  };
};

export const setUserId = (state='', action) => {
  switch (action.type) {
    case SET_USER_ID:
      return action.payload;

    default:
      return state;
  };
};
