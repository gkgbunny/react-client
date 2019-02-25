import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';

const AddDialog = (props) => {
  // const styles = theme => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  //   paper: {
  //     padding: theme.spacing.unit * 2,
  //     textAlign: 'center',
  //     color: theme.palette.text.secondary,
  //   },
  // });

  const { open, handleClose, maxWidth } = props;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={maxWidth}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Add Trainee
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter your trainee details
            <TextField
              error
              required
              id="outlined-required"
              label="Name"
              fullWidth
              // className={classes.textField}
              margin="normal"
              variant="outlined"
              helperText="hello"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="outlined-email-input"
              label="Email Address"
              fullWidth
              // className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Password"
                  // className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="outlined-password-input"
                  label="Confirm Password"
                  // className={classes.textField}
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCEL
          </Button>
          <Button onClick={handleClose} variant="outlined" disabled color="primary">
            SUBMIT
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
AddDialog.propTypes = {
  handleClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.bool,
};
AddDialog.defaultProps = {
  handleClose: () => {},
  open: 'false',
};
export default AddDialog;
