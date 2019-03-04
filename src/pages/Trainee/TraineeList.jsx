import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { AddDialog } from './components';
import trainees from './data/trainee';
import { TableComponent } from '../../components';

const styles = theme => ({
  margin: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

const getFormattedDate = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

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
    format: getFormattedDate,
  },
];

class TraineeList extends Component {
  state = {
    open: false,
    order: 'asc',
    orderBy: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSort = (field) => {
    console.log('///////////Inside handleSort/////////////////////', field);
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

  render() {
    const { open, order, orderBy } = this.state;
    const { classes } = this.props;
    return (
      <Typography className={classes.margin}>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEELIST
        </Button>
        <AddDialog
          maxWidth="xl"
          open={open}
          onClose={this.handleClose}
        />
        <TableComponent
          id="id"
          data={trainees}
          columns={column}
          orderBy={orderBy}
          order={order}
          onSelect={this.handleSelect}
          onSort={this.handleSort}
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
