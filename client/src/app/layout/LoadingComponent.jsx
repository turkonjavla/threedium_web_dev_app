import React from 'react';
import PropTypes from 'prop-types';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing(2),
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const LoadingComponent = ({ classes, color }) => {
  return (
    <React.Fragment>
      <CircularProgress className={classes.progress} color={color} />
    </React.Fragment>
  )
}

LoadingComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LoadingComponent);
