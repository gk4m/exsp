import React from 'react'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthService from '../services/auth';
import PlaylistContainer from '../containers/PlaylistContainer';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: 30,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      maxWidth: 1024,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const App = (props) => {
  const {classes} = props;

  return (
    <div id="app">

      <AppBar position="static" color='primary'>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>Exsp</Typography>
          <Button color="inherit" onClick={AuthService.logout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <main className={classes.layout}>
        <PlaylistContainer/>
      </main>

    </div>
  )
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
