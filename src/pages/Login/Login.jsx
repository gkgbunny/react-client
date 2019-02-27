import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import LockRounded from '@material-ui/icons/LockRounded';
import Email from '@material-ui/icons/Email';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  grow: {
    marginTop: theme.spacing.unit * 5,
  },
  root: {
    ...theme.mixins.gutters(),
    marginLeft: theme.spacing.unit * 60,
    marginRight: theme.spacing.unit * 60,
    marginTop: theme.spacing.unit * 10,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  down: {
    marginBottom: theme.spacing.unit * 2,
  },
});
class Login extends Component {
  schema = yup.object().shape({
    email: yup.string().required('Email Address is a required field').email('Email Address must be a valid email'),
    password: yup.string().required('Password is required'),
  });

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        email: '',
        password: '',
      },
      helperText: {
        email: '',
        password: '',
      },
      touched: {
        email: false,
        password: false,
      },
    };
  }

  getError = field => () => {
    const {
      email, password, error, helperText, touched,
    } = this.state;
    if (touched[field]) {
      this.schema
        .validate(
          {
            email,
            password,
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
      error, helperText, email, password,
    } = this.state;
    if (
      !Object.values(error).some(item => item)
      || !Object.values(helperText).some(item => item)
    ) {
      if (
        email.length !== 0
        && password.length !== 0
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
    const { onClose, classes } = this.props;
    const { error, helperText } = this.state;
    return (
      <>
        <Paper className={classes.root} elevation={10}>
          <Typography variant="h6" align="center">
            <LockRounded className={classes.alignIcon} color="secondary" variant="contained" />
            <br />
            <b>LOGIN</b>
          </Typography>
          <br />
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
          <Typography className={classes.grow}>
            <Button
              fullWidth
              className={classes.down}
              onClick={onClose}
              variant="contained"
              disabled={this.isDisabled()}
              color="primary"
            >
              SIGN IN
            </Button>
          </Typography>
        </Paper>
      </>
    );
  }
}
Login.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.objectOf.isRequired,
};
Login.defaultProps = {
  onClose: () => {},
};
export default withStyles(styles)(Login);
