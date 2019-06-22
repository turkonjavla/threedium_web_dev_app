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

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
});

class ArticleDashboard extends Component {
  handleRemoveArticle = articleId => () => {
    this.props.removeArticle(articleId);
  }

  render() {
    const { articles, classes, auth, loading } = this.props;

    if (loading) return <LoadingComponent />
    return (
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.mainGrid}>
          {
            articles &&
              articles.length > 0 ?
              articles.map(article =>
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
  loading: state.async.loading
});

const actions = {
  getArticles,
  removeArticle
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(ArticleDashboard);