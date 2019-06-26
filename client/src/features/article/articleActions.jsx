import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  CREATE_ARTICLE,
  REMOVE_ARTICLE,
  UNMOUNT_ARTICLE,
  UPDATE_ARTICLE,
  FETCH_USER_ARTICLES
} from './articleConstants';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from '../async/asyncActions';

const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const fetchArticles = articles => {
  return {
    type: FETCH_ARTICLES,
    payload: articles
  }
}

export const getArticles = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const res = await axios.get('/api/posts');

      await delay(1000);

      dispatch(fetchArticles(res.data));
      dispatch(asyncActionFinish());
    }
    catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}

export const fetchArticle = id => {
  return {
    type: FETCH_ARTICLE,
    payload: id
  }
}

export const getArticle = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const res = await axios.get(`/api/posts/${id}`);

      await delay(1000);

      dispatch(fetchArticle(res.data));
      dispatch(asyncActionFinish());
    }
    catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}

export const fetchUserArticles = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const res = await axios.get(`/api/posts/user/${id}`);

      await delay(1000);

      dispatch({
        type: FETCH_USER_ARTICLES,
        payload: res.data
      });
      dispatch(asyncActionFinish());
    }
    catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}

export const updateArticle = articleData => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(articleData);

    try {
      dispatch(asyncActionStart());
      const res = await axios.post(`/api/posts/update/${articleData._id}`, body, config);

      await delay(1000);

      dispatch({
        type: UPDATE_ARTICLE,
        payload: res.data
      });
      toastr.success('Updated', 'Article updated')
      dispatch(asyncActionFinish());
    }
    catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}

export const unmountArticle = id => {
  return async dispatch => {
    try {
      dispatch({
        type: UNMOUNT_ARTICLE
      })
    }
    catch (error) {
      console.log(error);
    }
  }
}

export const removeArticle = id => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: REMOVE_ARTICLE,
        payload: id
      });

      toastr.success('Success', "Article removed");
      dispatch(asyncActionFinish());
    }
    catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}

export const createArticle = articleData => {
  return async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const body = JSON.stringify(articleData);

    try {
      dispatch(asyncActionStart());
      const res = await axios.post(`/api/posts`, body, config);

      dispatch({
        type: CREATE_ARTICLE,
        payload: res.data
      });

      toastr.success('Success', "Article created");
      dispatch(asyncActionFinish());
    }
    catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  }
}