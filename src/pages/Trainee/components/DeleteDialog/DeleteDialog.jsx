import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteDialog = (props) => {
  const { open, onClose, maxWidth } = props;
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
          <Button
            onClick={onClose}
            variant="contained"
            color="primary"
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteDialog.propTypes = {
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.objectOf.isRequired,
};
DeleteDialog.defaultProps = {
  onClose: () => {},
};
export default DeleteDialog;
