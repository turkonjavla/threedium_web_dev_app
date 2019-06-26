import { createReducer } from '../../app/common/util/reducerUtil';
import {
  REGISTER_USER, LOAD_USER, AUTH_ERROR, LOGOUT_USER, LOGIN_USER
} from './authConstants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  user: null
}

export const registerUser = (state, payload) => {
  localStorage.setItem('token', payload.token);
  return {
    ...state,
    ...payload,
    isAuthenticated: true
  }
}

export const loginUser = (state, payload) => {
  localStorage.setItem('token', payload.token)
  return {
    ...state,
    ...payload,
    isAuthenticated: true
  }
}

export const logoutUser = (state, payload) => {
  localStorage.removeItem('token')
  return {
    ...state,
    token: null,
    isAuthenticated: false
  }
}

export const loadUser = (state, payload) => {
  return {
    ...state,
    isAuthenticated: true,
    user: payload
  }
}

export const authError = (state, payload) => {
  localStorage.removeItem('token')
  return {
    ...state,
    token: null,
    isAuthenticated: false
  }
}

export default createReducer(initialState, {
  [REGISTER_USER]: registerUser,
  [LOGIN_USER]: loginUser,
  [LOAD_USER]: loadUser,
  [AUTH_ERROR]: authError,
  [LOGOUT_USER]: logoutUser
});