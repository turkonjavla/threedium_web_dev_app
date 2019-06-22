import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './authConstants';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form'
import axios from 'axios';
import setAuthToken from '../../app/common/util/setAuthToken';
import { getArticles } from '../article/articleActions';

export const loadUser = () => {
  return async dispatch => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    }
    catch (error) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  }
}

export const register = user => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(user);

    try {
      const res = await axios.post('/api/users', body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch(reset('registerForm'));
      dispatch(getArticles());
      toastr.success('Success', `Welcome ${user.name}`);
    }
    catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          toastr.error('Error', error.msg)
        });
      }

      dispatch(reset('registerForm'))
      dispatch({
        type: REGISTER_FAIL
      });
    }
  }
}

export const login = user => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify(user);

    try {
      const res = await axios.post('/api/auth', body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      dispatch(getArticles());
      dispatch(reset('loginForm'));

      toastr.success('Success', `Welcome back`);
    }
    catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          toastr.error('Error', error.msg);
        });
      }

      dispatch(reset('loginForm'))
      dispatch({
        type: LOGIN_FAIL
      });
    }
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT
    });
  }
}