import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Moment from 'react-moment'

/* MUI Components */
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
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

const PostItem = ({ post, classes, auth }) => {
  return (
    <Grid item justifycontent="center" key={post.title} xs={12} md={6}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <Moment format="MMMM Do YYYY">{post.date}</Moment>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Author: {post.name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.text.substring(0, 15)}...
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`post/${post._id}`} size="small" color="primary">
              View
            </Button>
            {
              !auth.loading &&
              post.user === auth.user._id &&
              (
                <Button size="small" color="secondary">
                  Remove
                </Button>
              )
            }
          </CardActions>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={post.headerImgUrl}
            title="Image title"
          />
        </Hidden>
      </Card>
    </Grid>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

export default withStyles(styles)(PostItem)
