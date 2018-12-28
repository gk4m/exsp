import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from '@material-ui/core';

class PlaylistTableHead extends PureComponent {
  render() {
    const {
      onSelectAllClick,
      numSelected,
      rowCount,
      rows,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>

          {rows.map(row => (
            <TableCell
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
            >
              {row.label}
            </TableCell>
          ), this)}

        </TableRow>
      </TableHead>
    );
  }
}

PlaylistTableHead.propTypes = {
  rows: PropTypes.array.isRequired,
  rowCount: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
};

export default PlaylistTableHead;
