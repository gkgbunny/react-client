import React, { Component } from 'react';
import { Snackbar, IconButton } from '@material-ui/core/';
import { Close } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import green from '@material-ui/core/colors/green';
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
// import ErrorIcon from '@material-ui/icons/Error';

const SnackBarContext = React.createContext('Hello');

// const variantIcon = {
//   success: CheckCircleIcon,
//   error: ErrorIcon,
// };

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class SnackBarProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      message: '',
    };
  }

  openSnackBar = (message) => {
    this.setState({
      message,
      isOpen: true,
    });
  };

  closeSnackBar = () => {
    this.setState({
      message: '',
      isOpen: false,
    });
  };


  render() {
    const { children, classes, variant } = this.props;
    const { message, isOpen } = this.state;
    // const Icon = variantIcon[variant];

    return (
      <>
        <SnackBarContext.Provider
          value={{
            openSnackBar: this.openSnackBar,
            closeSnackBar: this.closeSnackBar,
            snackBarMessage: message,
            snackbarIsOpen: isOpen,
          }}
        >
          <SnackBarContext.Consumer>
            {({ closeSnackBar, snackbarIsOpen, snackBarMessage }) => (
              <Snackbar
                className={classes[variant]}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={snackbarIsOpen}
                autoHideDuration={6000}
                onClose={closeSnackBar}
                message={snackBarMessage}
                action={[
                  <IconButton key="close" color="inherit" className={classes.icon} onClick={closeSnackBar}>
                    <Close className={classes.icon} />
                  </IconButton>,
                ]}
              />
            )}
          </SnackBarContext.Consumer>
          {children}
        </SnackBarContext.Provider>

      </>
    );
  }
}
SnackBarProvider.propTypes = {
  children: PropTypes.objectOf,
  classes: PropTypes.objectOf.isRequired,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
};
SnackBarProvider.defaultProps = {
  children: {},
};
export default withStyles(styles)(SnackBarProvider);
export const SnackBarContextConsumer = SnackBarContext.Consumer;
