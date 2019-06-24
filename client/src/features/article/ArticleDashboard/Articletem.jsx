import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Moment from 'react-moment';

/* MUI Components */
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  }
})

const ArticleItem = ({ article, classes, auth, removeArticle }) => {
  return (
    <Grid item justifycontent="center" key={article.title} xs={12} md={6}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {article.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Moment format="MMMM Do YYYY">{article.date}</Moment>
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`article/${article._id}`} size="small" color="primary">
              Read More
            </Button>
            {
              !auth.loading &&
              article.user === auth.user._id &&
              (
                <Fragment>
                  <Button component={Link} to={`article/edit/${article._id}`} size="small">
                    Edit
                  </Button>
                  <Button onClick={removeArticle(article._id)} size="small" color="secondary">
                    Remove
                  </Button>
                </Fragment>
              )
            }
          </CardActions>
        </div>
      </Card>
    </Grid>
  )
}

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeArticle: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticleItem)
