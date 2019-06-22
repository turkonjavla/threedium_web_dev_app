import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

/* Reducers */
import authReducer from '../../features/auth/authReducer';
import postReducer from '../../features/post/postReducer';
import asyncReducer from '../../features/async/asyncReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer,
  post: postReducer,
  async: asyncReducer
});

export default rootReducer;