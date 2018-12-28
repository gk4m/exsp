import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
  Toolbar,
  Typography,
  Tooltip,
  Button,
} from '@material-ui/core';

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

class TableToolbar extends React.Component {
  render() {
    const {
      title,
      action,
      classes,
      selected,
      numSelected,
      disableAction,
    } = this.props;

    const isActionDisabled = disableAction || !(numSelected > 0);
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected}
              {' '}
selected
            </Typography>
          ) : (
            <Typography variant="title" id="tableTitle">
              {title}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title="Export">
            <div>
              <Button
                onClick={() => action(selected)}
                variant="contained"
                color="secondary"
                size="small"
                disabled={isActionDisabled}
              >
                Export
              </Button>
            </div>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }
}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  disableAction: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

export default withStyles(styles)(TableToolbar);
