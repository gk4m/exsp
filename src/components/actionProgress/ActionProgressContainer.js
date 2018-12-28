import { connect } from 'react-redux';

import { ActionProgress } from './ActionProgress';

const mapStateToProps = state => {
  return {
    actionExport: state.action.export,
    actionImport: state.action.import,
  };
};

export const ActionProgressContainer = connect(mapStateToProps, null)(ActionProgress);
