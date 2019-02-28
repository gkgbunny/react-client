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
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
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

  isTouched = field => () => {
    const {
      touched,
    } = this.state;
    this.setState({
      touched: { ...touched, [field]: true },
    }, this.validateForm);
  }

  validateForm = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = this.state;
    this.schema
      .validate({
        name, email, password, confirmPassword,
      }, { abortEarly: false })
      .then(() => {
        this.handleError(null);
      })
      .catch((err) => {
        this.handleError(err);
      });
  }

  handleError = (err) => {
    const focussedHelpertext = {};
    const focussedError = {};
    if (err) {
      err.inner.forEach((element) => {
        focussedHelpertext[element.path] = element.message;
        focussedError[element.path] = true;
      });
    }
    this.setState({
      helperText: focussedHelpertext,
      error: focussedError,
    });
  }

  hasError = () => {
    const {
      helperText,
      touched,
    } = this.state;
    if (!Object.values(helperText).some(item => item)
    && Object.values(touched).some(item => item)) {
      return false;
    }
    return true;
  }

  getError = (field) => {
    const {
      touched, error, helperText,
    } = this.state;
    if (!touched[field] || !error[field]) {
      return false;
    }
    return helperText[field];
  }

  handleChange = field => (event) => {
    const { error, helperText } = this.state;
    this.setState({
      [field]: event.target.value,
      error: { ...error, [field]: false },
      helperText: { ...helperText, [field]: '' },
    }, this.validateForm);
  }

  renderComponent = (id, label, type, name, icon) => (
    <TextField
      required
      fullWidth
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {icon}
          </InputAdornment>
        ),
      }}
      id={id}
      label={label}
      type={type}
      name={name}
      error={this.getError(name)}
      helperText={this.getError(name)}
      onFocus={this.isTouched(name)}
      onChange={this.handleChange(name)}
      onBlur={this.isTouched(name)}
    />
  )

  render() {
    const { open, onClose, maxWidth } = this.props;
    return (
      <>
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth}>
          <DialogTitle id="alert-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Enter your trainee details
              {this.renderComponent('outlined-name-input',
                'Name',
                'name',
                'name',
                <Person />)}
              {this.renderComponent('outlined-email-input',
                'Email Address',
                'email',
                'email',
                <Email />)}
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  {this.renderComponent('outlined-password-input',
                    'Password',
                    'password',
                    'password',
                    <VisibilityOff />)}
                </Grid>
                <Grid item xs={6}>
                  {this.renderComponent('outlined-password-input',
                    'Confirm Password',
                    'password',
                    'confirmPassword',
                    <VisibilityOff />)}
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              CANCEL
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              disabled={this.hasError()}
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
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.bool,
};
AddDialog.defaultProps = {
  onClose: () => {},
  open: 'false',
};
export default AddDialog;
