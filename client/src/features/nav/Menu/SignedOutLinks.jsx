import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

/* MUI Components */
import Button from '@material-ui/core/Button';

const SignedOutLinks = ({ login }) => {
  return (
    <Fragment>
      <Button color="inherit" size="small" onClick={login}>Login</Button>
      <Button component={Link} to="/register" variant="contained" size="small" color="secondary">Sign Up</Button>
    </Fragment>
  )
}

export default SignedOutLinks;
