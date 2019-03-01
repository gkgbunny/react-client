import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { AddDialog } from './components';
import trainees from './data/trainee';

const styles = theme => ({
  topMargin: {
    marginTop: theme.spacing.unit,
  },
});

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
    console.log(match);
    return trainees.map(trainee => <li><Link to={`${match.url}/${trainee.id}`}>{trainee.name}</Link></li>);
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Button className={classes.topMargin} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <AddDialog
          maxWidth="xl"
          open={open}
          onClose={this.handleClose}
        />
        <ul>
          {this.traineeList()}
        </ul>
      </div>
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
