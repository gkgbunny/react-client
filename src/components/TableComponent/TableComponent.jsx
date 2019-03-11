import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import { EnhancedTable } from '../index';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
    fontFamily: theme.typography.fontFamily,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class TableComponent extends Component {
  tableHead = (columns, order, orderBy) => {
    const { onSort } = this.props;
    return (
      <TableRow>
        {columns.map((columnsItem) => {
          const { field, ...rest } = columnsItem;
          return (
            <TableCell
              key={field}
              sortDirection={orderBy === field ? order : false}
              {...rest}
            >
              <Tooltip
                title="Sort"
                placement={columnsItem.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === field}
                  direction={order}
                  onClick={() => onSort(field)}
                >
                  {columnsItem.label || columnsItem.field}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          );
        })}
        <TableCell />
      </TableRow>
    );
  };

  tableBody = (data, columns, actions) => {
    const { classes, onSelect } = this.props;
    return data.map(dataItem => (
      <TableRow
        key={dataItem.id}
        className={classes.tableRow}
      >
        {columns.map((item) => {
          const { align, format, ...rest } = item;
          return (
            <TableCell align={align} {...rest} onClick={() => onSelect(dataItem.id)}>
              {format ? format(dataItem[item.field]) : dataItem[item.field]}
            </TableCell>
          );
        })}
        <TableCell>
          {actions.map((actionItem) => {
            const { icon, handler } = actionItem;
            return (
              <Button
                onClick={() => handler(dataItem)}
                className={classes.flexContainer}
              >
                {icon}
              </Button>
            );
          })}
        </TableCell>
      </TableRow>
    ));
  };

  tableFooter = (count, page, rowsPerPage, onChangePage) => (
    <TableRow>
      <TablePagination
        rowsPerPageOptions={[]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
      />
    </TableRow>
  );

  render() {
    const {
      classes,
      columns,
      data,
      order,
      orderBy,
      actions,
      count,
      page,
      rowsPerPage,
      onChangePage,
    } = this.props;
    if (data.length === 0) {
      return(
        <>
          <Paper className={classes.root}>
            NO data found
          </Paper>
        </>
      );
    }
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>{this.tableHead(columns, order, orderBy)}</TableHead>
            <TableBody>{this.tableBody(data, columns, actions)}</TableBody>
            <TableFooter>
              {this.tableFooter(count, page, rowsPerPage, onChangePage)}
            </TableFooter>
          </Table>
        </Paper>
      </>
    );
  }
}

TableComponent.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  columns: PropTypes.arrayOf.isRequired,
  data: PropTypes.arrayOf.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.string,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  actions: PropTypes.arrayOf.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
  orderBy: '',
  order: 'asc',
};
export default withStyles(styles)(EnhancedTable(TableComponent));
