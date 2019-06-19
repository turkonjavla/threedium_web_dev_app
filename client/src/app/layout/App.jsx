import React, { Fragment } from 'react';

/* MUI Components */
import { CssBaseline } from '@material-ui/core';

/* Components */
import NavBar from '../../features/nav/NavBar/NavBar';

const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <NavBar />
    </Fragment>
  );
}

export default App;
