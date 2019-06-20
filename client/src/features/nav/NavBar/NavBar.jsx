import React, { Component } from 'react';
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
  state = {
    auth: false
  }

  handleLogin = () => {
    this.setState({
      auth: true
    });
  }

  handleLogout = () => {
    this.setState({
      auth: false
    });
  }

  render() {
    const { classes } = this.props;
    const { auth } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.title}>
              Threedium
            </Typography>
            {
              auth
                ? <SignedInLinks logout={this.handleLogout} />
                : <SignedOutLinks login={this.handleLogin} />
            }
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavBar);