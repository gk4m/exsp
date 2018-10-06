import React from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


const ActionBar = (props) => {

  const {
    handleImportChange
  } = props;

  return (
    <div>
      <label htmlFor="import-file">
        <Button
          variant="contained"
          color="primary"
          component="span" style={{marginTop: '10px'}}>
          Import
        </Button>
        <input
          accept=".json"
          onChange={handleImportChange}
          id="import-file"
          type="file"
          style={{display: 'none'}}
        />
      </label>
    </div>
  )
};

ActionBar.propTypes = {
  handleImportChange: PropTypes.func.isRequired,
};

export default ActionBar;
