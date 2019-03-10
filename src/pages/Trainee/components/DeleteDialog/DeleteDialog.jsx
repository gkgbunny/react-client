import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { SnackBarContextConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const DeleteDialog = (props) => {
  const {
    open,
    onClose,
    maxWidth,
    data,
  } = props;
  const compareTo = 'Thu, 14 Feb 2019 00:00:00 +0000';
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
              moment(data.createdAt).isBefore(compareTo)
                ? (
                  <Button
                    onClick={() => {
                      onClose();
                      openSnackBar('This is a success message!', 'success');
                    }}
                    variant="contained"
                    color="primary"
                  >
                    DELETE
                  </Button>
                )
                : (
                  <Button
                    onClick={() => {
                      onClose();
                      openSnackBar('This is an error message!', 'error');
                    }}
                    variant="contained"
                    color="primary"
                  >
                    DELETE
                  </Button>
                )
            )}
          </SnackBarContextConsumer>
        </DialogActions>
      </Dialog>
    </>
  );
};
DeleteDialog.propTypes = {
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.objectOf.isRequired,
  data: PropTypes.objectOf,
};
DeleteDialog.defaultProps = {
  onClose: () => {},
  data: {},
};
export default DeleteDialog;
