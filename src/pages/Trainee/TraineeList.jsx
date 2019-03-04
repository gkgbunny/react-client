import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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

const column = [
  {
    field: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    field: 'email',
    label: 'Email Address',
  },
];

class TraineeList extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  traineeList = () => {
    const { match } = this.props;
    return trainees.map(trainee => <li><Link to={`${match.url}/${trainee.id}`}>{trainee.name}</Link></li>);
  }

  render() {
    const { open } = this.state;
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
          // orderBy={orderBy}
          // order={order}
          onSort={this.handleSort}
          onSelelect={this.handleSelect}
        />
        <ul>
          {this.traineeList()}
        </ul>
      </Typography>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf,
};
TraineeList.defaultProps = {
  match: {},
};
export default withStyles(styles)(TraineeList);
