import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class SnackBarProvider extends Component {
  openSnackBar = (message, status) => {

  }

  closeSnackBar = () => {

  }

  render() {
    return (
      <>
        <ThemeContext.Provider>

        </ThemeContext.Provider>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.openSnackBar}
          autoHideDuration={6000}
          onClose={this.closeSnackBar}
        >
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="This is a success message!"
          />
        </Snackbar>
      </>
    );
  }
}
export default SnackBarProvider;
