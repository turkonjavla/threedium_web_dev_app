import { GET_POSTS, POST_ERROR, REMOVE_POST, REMOVE_POST_ERROR } from './postConstants';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      }

    case POST_ERROR:
    case REMOVE_POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }

    default:
      return state;
  }
}