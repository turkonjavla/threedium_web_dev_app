import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { GET_POSTS, POST_ERROR, REMOVE_POST, REMOVE_POST_ERROR } from './postConstants';

export const getPosts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/posts');
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    }
    catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(error => {
          toastr.error('Error', error.msg);
        });
      }

      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  }
}

export const removePost = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: REMOVE_POST,
        payload: id
      });

      toastr.success('Success', "Post removed");
    }
    catch (error) {
      const errors = error.response.data.errors;
      console.log(error.message)
      if (errors) {
        errors.forEach(error => {
          toastr.error('Error', error.msg);
        });
      }

      dispatch({
        type: REMOVE_POST_ERROR
      });
    }
  }
}