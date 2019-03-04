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
    console.log('******Inside tableHead*******', columns, order, orderBy);
    const { onSort } = this.props;
    return (
      <TableRow>
        {
          columns.map((columnsItem) => {
            const { field, ...rest } = columnsItem;
            console.log(order, orderBy);

            return (
              <TableCell key={field} sortDirection={orderBy === field ? order : false} {...rest}>
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
          })
        }
      </TableRow>
    );
  };

  tableBody = (data, columns) => {
    const { onSelect, classes } = this.props;
    return (
      data.map(dataItem => (
        <TableRow
          key={dataItem.id}
          onClick={() => onSelect(dataItem.id)}
          className={classes.tableRow}
        >
          {
            columns.map((item) => {
              const { align, format, ...rest } = item;
              return (
                <TableCell align={align} {...rest}>
                  {format ? format(dataItem[item.field]) : dataItem[item.field]}
                </TableCell>
              );
            })
          }
        </TableRow>
      ))
    );
  };

  render() {
    const {
      classes,
      columns,
      data,
      order,
      orderBy,
    } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              {this.tableHead(columns, order, orderBy)}
            </TableHead>
            <TableBody>
              {this.tableBody(data, columns)}
            </TableBody>
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
  match: PropTypes.objectOf,
  onClick: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
  orderBy: '',
  order: 'asc',
  match: {},
};
export default withStyles(styles)(TableComponent);
