import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import {
  combineValidators,
  isRequired
} from 'revalidate';

/* MUI Components */
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/* Redux */
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

/* Components */
import TextInput from '../../../app/common/form/TextInput';
import LoadingComponent from '../../../app/layout/LoadingComponent';

/* Actions */
import { unmountArticle, getArticle, updateArticle, getArticles } from '../articleActions';

/* Validation */
const validate = combineValidators({
  title: isRequired('Title'),
  text: isRequired('Text')
});

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

class EditArticleForm extends Component {
  componentDidMount() {
    this.props.getArticle(this.props.match.params.id);
  }

  async componentWillUnmount() {
    await this.props.unmountArticle();
    this.props.getArticles();
  }

  handleUpdateArticle = async initialValues => {
    await this.props.updateArticle(initialValues);
    this.props.history.push('/articles');
  }

  render() {
    const { classes, invalid, submitting, pristine, loading, handleSubmit, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      return <Redirect to="/login" />
    }

    if (loading) return <LoadingComponent />
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Article
        </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit(this.handleUpdateArticle)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  autoComplete="off"
                  label="Article Header Image URL"
                  name="headerImgUrl"
                  type="text"
                  variant="outlined"
                  component={TextInput}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  autoComplete="off"
                  label="Article Title"
                  name="title"
                  type="text"
                  variant="outlined"
                  component={TextInput}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="text"
                  type="text"
                  component={TextInput}
                  multiline={true}
                  rows={10}
                  variant="outlined"
                  label="Write something here...."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pristine || invalid || submitting}
            >
              Submit
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/articles" variant="body2">
                  Cancel
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}

EditArticleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  getArticle: PropTypes.func.isRequired,
  unmountArticle: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  article: state.article.article,
  loading: state.async.loading,
  initialValues: state.article.article
});

const actions = {
  getArticle,
  unmountArticle,
  updateArticle,
  getArticles
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'editArticleForm', validate, enableReinitialize: true }),
  withStyles(styles)
)(EditArticleForm)
