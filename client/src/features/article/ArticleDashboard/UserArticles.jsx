import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

/* MUI Components */
import { withStyles, Container, Grid, Typography } from '@material-ui/core';

/* Components */
import ArticleItem from './Articletem';

/* Actions */
import { fetchUserArticles, removeArticle } from '../articleActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import Pagination from '../../../app/common/util/Pagination';

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
});

class UserArticles extends Component {
  state = {
    currentPage: 1,
    articlesPerPage: 6
  }

  componentDidMount() {
    this.props.fetchUserArticles(this.props.match.params.user_id);
  }

  handleRemoveArticle = articleId => () => {
    this.props.removeArticle(articleId);
    this.props.history.push('/articles');
  }

  handlePaginate = pageNumber => () => {
    this.setState({
      currentPage: pageNumber
    })
  }

  render() {
    const { userArticles, classes, auth, loading } = this.props;
    const { currentPage, articlesPerPage } = this.state;
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticle = userArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    if (loading) return <LoadingComponent />
    return (
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.mainGrid}>
          {
            currentArticle &&
              currentArticle.length > 0 ?
              currentArticle.map(article =>
                <ArticleItem
                  removeArticle={this.handleRemoveArticle}
                  key={article._id}
                  article={article}
                  auth={auth}
                />
              ) : <Typography>There are no articles</Typography>
          }
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginTop: '2em' }}
        >
          <Pagination
            currentPage={currentPage}
            paginate={this.handlePaginate}
            articlesPerPage={articlesPerPage}
            totalArticles={userArticles.length}
          />
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
  fetchUserArticles,
  removeArticle
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(UserArticles);