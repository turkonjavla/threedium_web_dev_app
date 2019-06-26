import {
  REGISTER_USER,
  LOAD_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_USER,
  LOGIN_USER
} from './authConstants';
import { toastr } from 'react-redux-toastr';
import { reset } from 'redux-form'
import axios from 'axios';
import setAuthToken from '../../app/common/util/setAuthToken';
import { getArticles } from '../article/articleActions';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

export const loadUser = () => {
  return async dispatch => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      dispatch(asyncActionStart());
      const res = await axios.get('/api/auth');

      dispatch({
        type: LOAD_USER,
        payload: res.data
      });
      dispatch(asyncActionFinish());
    }
    catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          toastr.error('Error', error.msg)
        });
      }

      dispatch(asyncActionError());
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
      dispatch(asyncActionStart());

      const res = await axios.post('/api/users', body, config);

      dispatch({
        type: REGISTER_USER,
        payload: res.data
      });

      toastr.success('Success', `Welcome ${user.name}`);

      dispatch(asyncActionFinish());
      await dispatch(loadUser());
      await dispatch(getArticles());
    }
    catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          toastr.error('Error', error.msg)
        });
      }

      dispatch({
        type: AUTH_ERROR
      });
      dispatch(reset('registerForm'));
      dispatch(asyncActionError());
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
      dispatch(asyncActionStart());
      const res = await axios.post('/api/auth', body, config);

      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      dispatch(asyncActionFinish());
      await dispatch(loadUser());
      await dispatch(getArticles());
      await dispatch(reset('loginForm'));
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
        type: AUTH_ERROR
      });
    }
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT_USER
    });
  }
}