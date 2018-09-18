import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {lighten} from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

class PlaylistTableToolbar extends React.Component {

  render() {
    const {
      numSelected,
      selected,
      classes,
      action,
    } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              Playlists
            </Typography>
          )}
        </div>
        <div className={classes.spacer}/>
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Export">
              <Button
                onClick={() => action(selected)}
                variant="contained"
                color="secondary"
                size="small"
              >
                Export
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Export">
              <Button
                onClick={() => action(selected)}
                variant="contained"
                color="secondary"
                size="small"
              >
                Export
              </Button>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
};

PlaylistTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(styles)(PlaylistTableToolbar);
