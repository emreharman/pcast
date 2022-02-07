import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL} from './actionTypes';

export const loginStart = () => {
  return {type: LOGIN_START};
};
export const loginSuccess = token => {
  return {type: LOGIN_FAIL, payload: token};
};
export const loginFail = error => {
  return {type: LOGIN_FAIL, payload: error};
};
