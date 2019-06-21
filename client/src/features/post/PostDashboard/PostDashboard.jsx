import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

/* MUI Components */
import { Container, Grid, withStyles } from '@material-ui/core';

/* Components */
import PostItem from './PostItem';

/* Actions */
import { getPosts, removePost } from '../postActions';

const styles = theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  }
})

const PostDashboard = ({ getPosts, post: { posts, loading }, classes, auth, removePost }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) return <p>loading</p>
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} className={classes.mainGrid}>
        {
          posts &&
          posts.map(post =>
            <PostItem
              removePost={removePost}
              key={post._id}
              post={post}
              auth={auth}
            />
          )
        }
      </Grid>
    </Container>
  )
};

PostDashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

const actions = {
  getPosts,
  removePost
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(PostDashboard);