import {
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  CREATE_ARTICLE,
  REMOVE_ARTICLE,
  UNMOUNT_ARTICLE,
  UPDATE_ARTICLE,
  FETCH_USER_ARTICLES
} from './articleConstants';
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = {
  articles: [],
  userArticles: [],
  article: null
};

export const fetchArticles = (state, payload) => {
  return {
    ...state,
    articles: payload
  };
}

export const fetchUserArticles = (state, payload) => {
  return {
    ...state,
    userArticles: payload
  }
}

export const fetchArticle = (state, payload) => {
  return {
    ...state,
    article: payload
  }
}

export const unmountArticle = (state, payload) => {
  return {
    ...state,
    article: null
  }
}

export const createArticle = (state, payload) => {
  return {
    ...state,
    articles: [
      Object.assign({}, payload),
      ...state.articles
    ]
  }
}

export const updateArticle = (state, payload) => {
  return {
    ...state,
    article: payload
  }
}

export const removeArticle = (state, payload) => {
  return {
    ...state,
    articles: [
      ...state.articles.filter(article => article._id !== payload)
    ]
  }
}

export default createReducer(initialState, {
  [FETCH_ARTICLES]: fetchArticles,
  [CREATE_ARTICLE]: createArticle,
  [UPDATE_ARTICLE]: updateArticle,
  [REMOVE_ARTICLE]: removeArticle,
  [FETCH_ARTICLE]: fetchArticle,
  [FETCH_USER_ARTICLES]: fetchUserArticles,
  [UNMOUNT_ARTICLE]: unmountArticle
});