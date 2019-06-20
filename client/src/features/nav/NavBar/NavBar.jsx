import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignedOutLinks from '../Menu/SignedOutLinks';
import SignedInLinks from '../Menu/SignedInLinks';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none'
  }
});

class NavBar extends Component {
  render() {
    const { classes, isAuthenticated } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
              Threedium
            </Typography>
            {
              isAuthenticated &&
                isAuthenticated ?
                isAuthenticated &&
                <SignedInLinks /> : <SignedOutLinks />
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(NavBar);