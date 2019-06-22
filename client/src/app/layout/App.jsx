import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

/* MUI Components */
import { CssBaseline } from '@material-ui/core';

/* Components */
import NavBar from '../../features/nav/NavBar/NavBar';
import ArticleDashboard from '../../features/article/ArticleDashboard/ArticleDashboard';
import RegisterForm from '../../features/auth/Register/RegisterForm';
import LoginForm from '../../features/auth/Login/LoginForm';
import ArticleForm from '../../features/article/ArticleForm/ArticleForm';
import ArticleDetailsPage from '../../features/article/ArticleDetails/ArticleDetailsPage';
import PrivateRoute from '../common/util/PrivateRoute';

/* Actions */
import { loadUser } from '../../features/auth/authActions';
import { getArticles } from '../../features/article/articleActions';

/* Custom Set Auth Token function */
import setAuthToken from '../common/util/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

class App extends Component {
  componentDidMount() {
    this.props.loadUser();
    this.props.getArticles();
  }
  render() {
    return (
      <Fragment>
        <CssBaseline />
        <NavBar />
        <Switch>
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/login" component={LoginForm} />
          <PrivateRoute exact path="/articles" component={ArticleDashboard} />
          <PrivateRoute exact path="/article/add" component={ArticleForm} />
          <PrivateRoute exact path="/article/:id" component={ArticleDetailsPage} />
        </Switch>
      </Fragment>
    )
  }
}

const actions = {
  loadUser,
  getArticles
}

export default connect(null, actions)(App);
