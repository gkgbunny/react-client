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
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import Email from '@material-ui/icons/Email';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SnackBarContextConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../libs/utils/api';

const styles = theme => ({
  progress: {
    color: green[800],
  },
});
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
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
      loading: false,
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
    const focussederror = {};
    if (err) {
      err.inner.forEach((element) => {
        focussederror[element.path] = element.message;
      });
    }
    this.setState({
      error: focussederror,
    });
  }

  hasError = () => {
    const {
      error,
      touched,
      loading,
    } = this.state;
    if (!Object.values(error).some(item => item)
    && Object.values(touched).some(item => item)
    && !loading) {
      return false;
    }
    return true;
  }

  getError = (field) => {
    const {
      touched, error,
    } = this.state;
    if (!touched[field]) {
      return '';
    }
    return error[field];
  }

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
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
      onChange={this.handleChange(name)}
      onBlur={this.isTouched(name)}
    />
  )

  handleSubmit = async (e, openSnackBar) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const { onClose } = this.props;
    const storedToken = localStorage.getItem('token');
    this.setState({
      name: e.target.value,
      email: e.target.value,
      password: e.target.value,
      loading: true,
    });
    try {
      const response = await callApi('/trainee', 'POST', {name, email, password}, storedToken);
      if (response.statusText === 'OK') {
        this.setState({
          loading: false,
        });
        onClose();
        openSnackBar(response.data.message, 'success');
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { open, onClose, maxWidth, classes } = this.props;
    const { loading } = this.state;
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
            <SnackBarContextConsumer>
              {({ openSnackBar }) => (
                <Button
                  onClick={(e) => {
                    this.handleSubmit(e, openSnackBar)
                  }}
                  variant="outlined"
                  disabled={this.hasError()}
                  color="primary"
                >
                  {loading ? <CircularProgress className={classes.progress} /> : 'SUBMIT'}
                </Button>
              )}
            </SnackBarContextConsumer>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
AddDialog.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.bool,
};
AddDialog.defaultProps = {
  onClose: () => {},
  open: 'false',
};
export default withStyles(styles)(AddDialog);
