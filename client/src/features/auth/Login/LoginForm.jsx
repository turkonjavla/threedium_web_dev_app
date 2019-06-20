import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  combineValidators,
  composeValidators,
  isRequired,
  createValidator
} from 'revalidate';

/* MUI Components */
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/* Redux */
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

/* Components */
import TextInput from '../../../app/common/form/TextInput';

/* Actions */
import { login } from '../authActions';

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message
    }
  },
  'Invalid email address'
)

/* Validation */
const validate = combineValidators({
  email: composeValidators(
    isRequired('Email'),
    isValidEmail
  )(),
  password: composeValidators(
    isRequired('Password')
  )()
})

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const LoginForm = ({ classes, handleSubmit, invalid, submitting, login, isAuthenticated }) => {

  const loginUser = values => {
    login(values);
  }

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/posts" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(loginUser)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                autoComplete="off"
                label="Email Address"
                name="email"
                type="email"
                variant="outlined"
                component={TextInput}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                autoComplete="off"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                component={TextInput}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={invalid || submitting}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const actions = {
  login
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'loginForm', validate }),
  withStyles(styles)
)(LoginForm)
