import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

/* MUI Components */
import { CssBaseline } from '@material-ui/core';

/* Components */
import NavBar from '../../features/nav/NavBar/NavBar';
import RegisterForm from '../../features/auth/Register/RegisterForm';
import LoginForm from '../../features/auth/Login/LoginForm';

/* Actions */
import { loadUser } from '../../features/auth/authActions';

/* Custom Set Auth Token function */
import setAuthToken from '../common/util/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = ({ store }) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
      <Switch>
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
      </Switch>
    </Fragment>
  );
}

export default App;
