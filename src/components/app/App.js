import React, { Component } from 'react';
import ReduxToastr from 'react-redux-toastr';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Tab,
  Tabs,
  withStyles,
} from '@material-ui/core';

import AuthService from '@/services/auth';
import { ActionProgressContainer } from '@/components/actionProgress';
import { ActionBarContainer } from '@/components/actionBar';
import { PlaylistContainer } from '@/components/playlist';
import { AlbumContainer } from '@/components/album';
import { ArtistContainer } from '@/components/artist';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginTop: 30,
    marginBottom: 30,
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

class App extends Component {
  state = {
    activeTab: 0,
  };

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const { activeTab } = this.state;
    const { classes } = this.props;

    return (
      <div id="app">
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="bottom-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />

        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Exsp
            </Typography>
            <Button
              color="inherit"
              onClick={AuthService.logout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <main className={classes.layout}>
          <ActionProgressContainer />
          <ActionBarContainer />
          <Tabs
            value={activeTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Playlists" />
            <Tab label="Albums" />
            <Tab label="Artists" />
          </Tabs>

          <PlaylistContainer isVisible={activeTab === 0} />
          <AlbumContainer isVisible={activeTab === 1} />
          <ArtistContainer isVisible={activeTab === 2} />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
