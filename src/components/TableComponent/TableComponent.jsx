import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class TableComponent extends Component {
  tableHead = () => {
    const { columns } = this.props;
    return (
      <TableRow>
        {
          columns.map((columnsItem) => {
            const { align, ...rest } = columnsItem;
            return (
              <TableCell align={align} {...rest}>
                {columnsItem.label || columnsItem.field}
              </TableCell>
            );
          })
        }
      </TableRow>
    );
  };

  tableBody = () => {
    const { data, columns } = this.props;
    return (
      data.map(dataItem => (
        <TableRow key={dataItem.id}>
          {
            columns.map((item) => {
              const { align, ...rest } = item;
              return (
                <TableCell align={align} {...rest}>
                  {dataItem[item.field]}
                </TableCell>
              );
            })
          }
        </TableRow>
      ))
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              {this.tableHead()}
            </TableHead>
            <TableBody>
              {this.tableBody()}
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
};
export default withStyles(styles)(TableComponent);
