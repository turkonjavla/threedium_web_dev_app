import {
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  CREATE_ARTICLE,
  REMOVE_ARTICLE,
  UNMOUNT_ARTICLE
} from './articleConstants';
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = {
  articles: [],
  article: null
};

export const fetchArticles = (state, payload) => {
  return {
    ...state,
    articles: payload
  };
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
  [REMOVE_ARTICLE]: removeArticle,
  [FETCH_ARTICLE]: fetchArticle,
  [UNMOUNT_ARTICLE]: unmountArticle
});