import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { AddDialog } from './components';
import { Navbar } from '../pages/components';

const styles = theme => ({
  topMargin: {
    marginTop: theme.spacing.unit,
  },
});
class Trainee extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Navbar />
        <Button className={classes.topMargin} variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <AddDialog
          maxWidth="xl"
          open={open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}
Trainee.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};
export default withStyles(styles)(Trainee);
