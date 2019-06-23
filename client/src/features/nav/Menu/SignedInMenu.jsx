import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

/* Material UI Components */
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

class SignedInLinks extends Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { logout, location: { pathname }, user } = this.props;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <Avatar alt={user.name} src={user.avatar} style={{ width: '30px', height: '30px' }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem style={{ background: 'none' }} disabled={false} selected={false}>
            <ListItemIcon>
              <Avatar alt={user.name} src={user.avatar} style={{ width: '30px', height: '30px' }} />
            </ListItemIcon>
            <ListItemText primary={user.name} />
          </MenuItem>
          <Divider />

          <MenuItem onClick={this.handleClose} component={Link} to="/articles" selected={'/articles' === pathname}>
            <ListItemText primary={"Articles"} />
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="/article/add" selected={'/article/add' === pathname}>
            <ListItemText primary={"Add Article"} />
          </MenuItem>

          <MenuItem onClick={logout}>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

SignedInLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default withRouter(SignedInLinks);