/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SnackBarContextConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../libs/utils/api';

const styles = () => ({
  progress: {
    color: green[800],
    position: 'absolute',
  },
});


class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  hasError = () => {
    const {
      loading,
    } = this.state;
    if (!loading) {
      return false;
    }
    return true;
  }

  handleSubmit = async (e, openSnackBar) => {
    e.preventDefault();
    const { onClose, data } = this.props;
    const storedToken = localStorage.getItem('token');
    this.setState({
      loading: true,
    });
    try {
      const response = await callApi(`/trainee/${data.originalId}`, 'DELETE', {}, storedToken);
      if (response.statusText === 'OK') {
        this.setState({
          loading: false,
        });
        openSnackBar(response.data.message, 'success');
        onClose();
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      openSnackBar(error.message, 'error');
      onClose();
    }
  }

  render() {
    const {
      open,
      onClose,
      maxWidth,
      classes,
    } = this.props;
    const { loading } = this.state;
    return (
      <>
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
          <DialogTitle id="alert-dialog-title">Remove Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to remove the trainee?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              CANCEL
            </Button>
            <SnackBarContextConsumer>
              {({ openSnackBar }) => (
                <Button
                  onClick={(e) => {
                    this.handleSubmit(e, openSnackBar);
                  }}
                  disabled={this.hasError()}
                  variant="contained"
                  color="primary"
                >
                  SUBMIT
                  {loading ? <CircularProgress className={classes.progress} size={20} /> : ''}
                </Button>
              )}
            </SnackBarContextConsumer>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
DeleteDialog.propTypes = {
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.bool,
  data: PropTypes.objectOf,
  classes: PropTypes.objectOf.isRequired,
};
DeleteDialog.defaultProps = {
  onClose: () => {},
  data: {},
  open: false,
};
export default withStyles(styles)(DeleteDialog);
