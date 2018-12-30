import { connect } from 'react-redux';

import { ActionProgress } from './ActionProgress';

const mapStateToProps = state => ({
  actionExport: state.action.export,
  actionImport: state.action.import,
});

export const ActionProgressContainer = connect(mapStateToProps, null)(ActionProgress);
