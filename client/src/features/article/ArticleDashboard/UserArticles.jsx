import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

/* MUI Components */
import { withStyles, Container, Grid, Typography } from '@material-ui/core';

/* Components */
import ArticleItem from './Articletem';

/* Actions */
import { fetchUserArticles } from '../articleActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
});

class UserArticles extends Component {
  componentDidMount() {
    this.props.fetchUserArticles(this.props.match.params.user_id);
  }

  render() {
    const { userArticles, classes, auth, loading } = this.props;

    if (loading) return <LoadingComponent />
    return (
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.mainGrid}>
          {
            userArticles &&
              userArticles.length > 0 ?
              userArticles.map(article =>
                <ArticleItem
                  removeArticle={this.handleRemoveArticle}
                  key={article._id}
                  article={article}
                  auth={auth}
                />
              ) : <Typography>There are no articles</Typography>
          }
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  userArticles: state.article.userArticles,
  auth: state.auth,
  loading: state.async.loading
})

const actions = {
  fetchUserArticles
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(UserArticles);