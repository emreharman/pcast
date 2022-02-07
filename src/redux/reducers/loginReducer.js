import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/actionTypes';

const initialState = {
  start: false,
  success: false,
  token: '',
  fail: false,
  error: '',
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        start: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        token: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        start: false,
        success: false,
        fail: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
