import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
} from '@material-ui/core';

import TableHead from './TableHead';
import TableToolbar from './TableToolbar';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomTable extends React.Component {
  state = {
    selected: [],
    page: 0,
    rowsPerPage: 5,
  };

  handleSelectAllClick = (event) => {
    const {
      items,
    } = this.props;

    if (event.target.checked) {
      this.setState(() => ({
        selected: items.map(n => n.id),
      }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
    });
  };

  isSelected = (id) => {
    const { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  render() {
    const {
      classes,
      items,
      title,
      headRows,
      renderBody,
      handleActionClick,
      disableAction,
    } = this.props;

    const {
      selected,
      rowsPerPage,
      page,
    } = this.state;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>

        <TableToolbar
          numSelected={selected.length}
          selected={selected}
          action={handleActionClick}
          disableAction={disableAction}
          title={title}
        />

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby={title}>

            <TableHead
              numSelected={selected.length}
              onSelectAllClick={this.handleSelectAllClick}
              rowCount={items.length}
              rows={headRows}
            />

            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  const isSelected = this.isSelected(item.id);

                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, item.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={item.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      {renderBody && (
                        renderBody(item)
                      )}
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}

            </TableBody>
          </Table>
        </div>

        <TablePagination
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

CustomTable.defaultProps = {
  title: '',
};

CustomTable.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array.isRequired,
  headRows: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  renderBody: PropTypes.func.isRequired,
  disableAction: PropTypes.bool.isRequired,
  handleActionClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomTable);
