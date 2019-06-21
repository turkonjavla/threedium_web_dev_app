import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

/* MUI Components */
import Button from '@material-ui/core/Button';

const SignedInLinks = ({ logout }) => {
  return (
    <Fragment>
      <Button color="inherit" size="small">New Article</Button>
      <Button component={Link} to="/posts" color="inherit" size="small">Articles</Button>
      <Button color="inherit" size="small" onClick={logout}>Log Out</Button>
    </Fragment>
  )
}

export default SignedInLinks;
