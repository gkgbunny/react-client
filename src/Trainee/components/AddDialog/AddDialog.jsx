import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';

class AddDialog extends Component {
  schema = yup.object().shape({
    name: yup.string().required('Name is a required field'),
    email: yup.string().required('Email Address is a required field').email('Email Address must be a valid email'),
    password: yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Must contain 8 characters, at least one uppercase letter, one lowercase and one number')
      .required('Password is required'),
    confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Must match password'),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      helperText: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  getError = field => () => {
    const {
      name, email, password, confirmPassword, error, helperText, touched,
    } = this.state;
    if (touched[field]) {
      this.schema
        .validate(
          {
            name,
            email,
            password,
            confirmPassword,
          },
          { abortEarly: false },
        )
        .then(() => {
          this.setState({
            error: { ...error, [field]: false },
            helperText: { ...helperText, [field]: '' },
            touched: { ...touched, [field]: false },
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.inner.some(item => item.path === field)) {
            err.inner.forEach((element) => {
              if (element.path === field) {
                this.setState({
                  error: { ...error, [field]: true },
                  helperText: { ...helperText, [field]: element.message },
                });
              }
            });
          } else {
            this.setState({
              error: { ...error, [field]: false },
              helperText: { ...helperText, [field]: '' },
              touched: { ...touched, [field]: false },
            });
          }
        });
    }
  };

  isDisabled = () => {
    const {
      error, helperText, name, email, password, confirmPassword,
    } = this.state;
    if (
      !Object.values(error).some(item => item)
      || !Object.values(helperText).some(item => item)
    ) {
      if (
        name.length !== 0
        && email.length !== 0
        && password.length !== 0
        && confirmPassword.length !== 0
      ) {
        return false;
      }
      return true;
    }
    return true;
  };

  hasError = (field) => {
    const { error } = this.state;
    if (error[field]) {
      return true;
    }
    return false;
  };

  isTouched = field => () => {
    const { touched } = this.state;
    this.setState({
      touched: { ...touched, [field]: true },
    }, this.getError(field));
  };

  handleChange = field => (event) => {
    const { error, helperText } = this.state;
    if (this.hasError(field)) {
      this.setState({
        [field]: event.target.value,
      }, this.getError(field));
    } else {
      this.setState({
        [field]: event.target.value,
        error: { ...error, [field]: false },
        helperText: { ...helperText, [field]: '' },
      }, this.getError(field));
    }
  };

  render() {
    const { open, handleClose, maxWidth } = this.props;
    const { error, helperText } = this.state;
    return (
      <>
        <Dialog open={open} onClose={handleClose} maxWidth={maxWidth}>
          <DialogTitle id="alert-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Enter your trainee details
              <TextField
                error={error.name}
                required
                id="outlined-required"
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={helperText.name}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                onChange={this.handleChange('name')}
                onBlur={this.isTouched('name')}
              />
              <TextField
                error={error.email}
                helperText={helperText.email}
                id="outlined-email-input"
                label="Email Address"
                fullWidth
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                onChange={this.handleChange('email')}
                onBlur={this.isTouched('email')}
              />
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <TextField
                    error={error.password}
                    helperText={helperText.password}
                    fullWidth
                    id="outlined-password-input"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),
                    }}
                    onChange={this.handleChange('password')}
                    onBlur={this.isTouched('password')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={error.confirmPassword}
                    helperText={helperText.confirmPassword}
                    fullWidth
                    id="outlined-password-input"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),
                    }}
                    onChange={this.handleChange('confirmPassword')}
                    onBlur={this.isTouched('confirmPassword')}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              CANCEL
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={this.isDisabled()}
              color="primary"
            >
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
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
