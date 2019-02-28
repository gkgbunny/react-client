import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { AddDialog } from './components';

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
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
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

export default Trainee;
