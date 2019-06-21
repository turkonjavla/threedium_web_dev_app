import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

/* Reducers */
import authReducer from '../../features/auth/authReducer';
import postReducer from '../../features/post/postReducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer,
  post: postReducer
});

export default rootReducer;