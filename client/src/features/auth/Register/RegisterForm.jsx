import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  combineValidators,
  composeValidators,
  isRequired,
  createValidator,
  hasLengthBetween,
  matchesField,
  hasLengthLessThan
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
import { register } from '../authActions';

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message
    }
  },
  'Invalid email address'
)

const noWhitespace = createValidator(
  message => value => {
    if (value && !/^[\x21-\x7E]+$/i.test(value)) {
      return message
    }
  },
  'No whitespaces allowed'
)

const specialCharacters = createValidator(
  message => value => {
    if (value && !/^[a-zA-Z0-9#$&.+,"]*$/i.test(value)) {
      return message
    }
  },
  'Only | # | $ | & | . | + | , | allowed'
)

/* Validation */
const validate = combineValidators({
  name: composeValidators(
    isRequired({ message: 'Please enter your full name' }),
    hasLengthLessThan(300)({ message: 'You name can\'t be more than 300 characters' })
  )(),
  email: composeValidators(
    isRequired('Email'),
    isValidEmail
  )(),
  password: composeValidators(
    isRequired('Password'),
    hasLengthBetween(6, 30)({ message: 'Password must be between 6 and 30 characters' }),
    noWhitespace,
    specialCharacters
  )(),
  confirmPassword: composeValidators(
    isRequired({ message: 'Please confirm your password' }),
    matchesField('password')({ message: 'Passwords don\'t match' })
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

const RegisterForm = ({ classes, handleSubmit, invalid, submitting, register }) => {

  const registerUser = values => {
    register(values);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(registerUser)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                autoComplete="off"
                label="Full Name"
                name="name"
                type="text"
                variant="outlined"
                component={TextInput}
              />
            </Grid>
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
            <Grid item xs={12}>
              <Field
                autoComplete="off"
                label="Confirm Password"
                name="confirmPassword"
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
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

const actions = {
  register
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'registerForm', validate }),
  withStyles(styles)
)(RegisterForm)
