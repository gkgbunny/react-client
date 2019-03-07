import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { AddDialog, EditDialog, DeleteDialog } from './components';
import trainees from './data/trainee';
import { TableComponent } from '../../components';

const styles = theme => ({
  margin: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});
class TraineeList extends Component {
  state = {
    open: {
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
    },
    data: '',
    order: 'asc',
    orderBy: '',
    count: 100,
    page: 0,
    rowPerPage: 5,
  };

  getFormattedDate = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  handleClose = () => {
    this.setState({
      open: {
        addDialog: false,
        editDialog: false,
        deleteDialog: false,
      },
    });
  };

  handleAddDialogOpen = () => {
    const { open } = this.state;
    this.setState({
      open: { ...open, addDialog: true },
    });
  };

  handleEditDialogOpen = (traineeData) => {
    const { open } = this.state;
    this.setState({
      data: traineeData,
      open: { ...open, editDialog: true },
    });
  }

  handleRemoveDialogOpen = (traineeData) => {
    const { open } = this.state;
    this.setState({
      data: traineeData,
      open: { ...open, deleteDialog: true },
    });
  }

  handleSort = (field) => {
    const { orderBy, order } = this.state;
    if (orderBy === field && order === 'desc') {
      this.setState({
        order: 'asc',
        orderBy: field,
      });
    } else {
      this.setState({
        order: 'desc',
        orderBy: field,
      });
    }
  };

  handleSelect = (id) => {
    const { match, history } = this.props;
    history.push(`${match.url}/${id}`);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {
      open,
      order,
      orderBy,
      count,
      page,
      rowPerPage,
    } = this.state;

    const action = [
      {
        icon: <EditIcon />,
        handler: this.handleEditDialogOpen,
      },
      {
        icon: <DeleteIcon />,
        handler: this.handleRemoveDialogOpen,
      },
    ];
    const column = [
      {
        field: 'name',
        label: 'Name',
        align: 'center',
      },
      {
        field: 'email',
        label: 'Email Address',
        format: value => value && value.toUpperCase(),
      },
      {
        field: 'createdAt',
        label: 'Date',
        align: 'right',
        format: this.getFormattedDate,
      },
    ];
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <Typography className={classes.margin}>
        <Button variant="outlined" color="primary" onClick={this.handleAddDialogOpen}>
          ADD TRAINEELIST
        </Button>
        <TableComponent
          id="id"
          data={trainees}
          columns={column}
          actions={action}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={count}
          page={page}
          rowsPerPage={rowPerPage}
          onChangePage={this.handleChangePage}
        />
        <AddDialog
          maxWidth="xl"
          open={open.addDialog}
          onClose={this.handleClose}
        />
        <EditDialog
          maxWidth="xl"
          open={open.editDialog}
          onClose={this.handleClose}
          data={data}
        />
        <DeleteDialog
          maxWidth="xl"
          open={open.deleteDialog}
          onClose={this.handleClose}
          data={data}
        />
      </Typography>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf,
  history: PropTypes.objectOf,
};
TraineeList.defaultProps = {
  match: {},
  history: {},
};
export default withStyles(styles)(TraineeList);
