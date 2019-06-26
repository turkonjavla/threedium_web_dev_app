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
import SignedOutLinks from '../Menu/SignedOutMenu';
import SignedInLinks from '../Menu/SignedInMenu';

/* Actions */
import { logout } from '../../auth/authActions';

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
    const { classes, isAuthenticated, logout, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
              Threedium
            </Typography>
            {
              user &&
                isAuthenticated
                ? (<SignedInLinks
                  logout={logout}
                  user={user}
                />)
                : (<SignedOutLinks />)
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
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const actions = {
  logout
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(NavBar);