import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

/* MUI Components */
import { Container, Grid, withStyles, Typography } from '@material-ui/core';

/* Components */
import ArticleItem from './Articletem';

/* Actions */
import { getArticles, removeArticle } from '../articleActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import Pagination from '../../../app/common/util/Pagination';

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
});

class ArticleDashboard extends Component {
  state = {
    currentPage: 1,
    articlesPerPage: 6
  }

  handleRemoveArticle = articleId => () => {
    this.props.removeArticle(articleId);
  }

  handlePaginate = pageNumber => () => {
    this.setState({
      currentPage: pageNumber
    })
  }

  render() {
    const { articles, classes, auth, loading } = this.props;
    const { currentPage, articlesPerPage } = this.state;
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticle = articles.slice(indexOfFirstArticle, indexOfLastArticle);

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
                  loading={loading}
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
            totalArticles={articles.length}
          />
        </Grid>
      </Container>
    )
  }
}

ArticleDashboard.propTypes = {
  getArticles: PropTypes.func.isRequired,
  removeArticle: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  articles: state.article.articles,
  auth: state.auth,
  loading: state.async.loading,
  currentPage: state.article.currentPage,
  articlesPerPage: state.article.articlesPerPage
});

const actions = {
  getArticles,
  removeArticle
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(ArticleDashboard);