import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const rows = [
  {id: 'image', numeric: false, disablePadding: false, label: ''},
  {id: 'name', numeric: false, disablePadding: false, label: 'Name'},
  {id: 'owner', numeric: false, disablePadding: false, label: 'Owner'},
  {id: 'tracks', numeric: true, disablePadding: false, label: 'Tracks'},
];

class PlaylistTableHead extends React.Component {
  render() {
    const {
      onSelectAllClick,
      numSelected,
      rowCount
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

          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                {row.label}
              </TableCell>
            );
          }, this)}

        </TableRow>
      </TableHead>
    );
  }
}

PlaylistTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default PlaylistTableHead;
