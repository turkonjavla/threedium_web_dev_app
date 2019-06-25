import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import Moment from 'react-moment';

/* MUI Components */
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Markdown from '../../../app/common/util/Markdown';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

/* Components */
import LoadingComponent from '../../../app/layout/LoadingComponent';

/* Actions */
import { getArticle, unmountArticle } from '../articleActions';

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  card: {
    width: '100%',
    padding: theme.spacing(2)
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  }
});

class ArticleDetailsPage extends Component {
  componentDidMount() {
    this.props.getArticle(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.unmountArticle();
  }

  render() {
    const { loading, article, classes } = this.props;

    if (loading || article === null) return <LoadingComponent />
    return (
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.mainGrid}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar alt={article.name} src={article.avatar} className={classes.avatar}>
                  R
                </Avatar>
              }
              title={article.title}
              subheader={
                <Fragment>
                  <Typography variant="subtitle2">Posted by {article.name}</Typography>
                  <Moment format="MMMM Do YYYY">{article.date}</Moment>
                </Fragment>
              }
            />
            {
              article.headerImgUrl &&
              <CardMedia
                className={classes.media}
                image={article.headerImgUrl}
                title={article.title}
              />
            }
            <CardContent>
              <Markdown className={classes.markdown}>
                {article.text}
              </Markdown>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    )
  }
}

ArticleDetailsPage.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  article: state.article.article,
  loading: state.async.loading
});

const actions = {
  getArticle,
  unmountArticle
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(ArticleDetailsPage);