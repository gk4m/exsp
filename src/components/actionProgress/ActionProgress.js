import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';

export class ActionProgress extends Component {
  render() {
    const {
      actionExport,
      actionImport,
    } = this.props;

    return (
      <div>
        {actionExport.isLoading && (
          <LinearProgress color="secondary" style={{marginBottom: '10px'}}/>
        )}
        {actionImport.isLoading && (
          <LinearProgress color="primary" style={{marginBottom: '10px'}}/>
        )}
      </div>
    );
  }
}

ActionProgress.propTypes = {
  actionExport: PropTypes.object.isRequired,
  actionImport: PropTypes.object.isRequired,
};

