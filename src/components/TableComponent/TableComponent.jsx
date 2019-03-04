import React from 'react';
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

const TableComponent = (props) => {
  const { classes, data, columns } = props;
  return (
    <>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                columns.map(columnsItem => (
                  <TableCell align={columnsItem.align}>
                    {columnsItem.label || columnsItem.field}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map(dataItem => (
                <TableRow key={dataItem.id}>
                  {
                    columns.map(item => (
                      <TableCell align={item.align}>
                        {dataItem[item.field]}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};
TableComponent.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  columns: PropTypes.arrayOf.isRequired,
  data: PropTypes.arrayOf.isRequired,
};
export default withStyles(styles)(TableComponent);
