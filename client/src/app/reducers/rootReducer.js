import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

/* Reducers */
import authReducer from '../../features/auth/authReducer';
import articleReducer from '../../features/article/articleReducer';
import asyncReducer from '../../features/async/asyncReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer,
  article: articleReducer,
  async: asyncReducer
});

export default rootReducer;