import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Email from '@material-ui/icons/Email';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Avatar } from '@material-ui/core';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    marginLeft: theme.spacing.unit * 60,
    marginRight: theme.spacing.unit * 60,
    marginTop: theme.spacing.unit * 8,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 5,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
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
      touched: {
        email: false,
        password: false,
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
      email,
      password,
    } = this.state;
    this.schema
      .validate({
        email, password,
      }, { abortEarly: false })
      .then(() => {
        this.handleError(null);
      })
      .catch((err) => {
        this.handleError(err);
      });
  }

  handleError = (err) => {
    const focussedError = {};
    if (err) {
      err.inner.forEach((element) => {
        focussedError[element.path] = element.message;
      });
    }
    this.setState({
      error: focussedError,
    });
  }

  hasError = () => {
    const {
      error,
      touched,
    } = this.state;
    if (!Object.values(error).some(item => item)
    && Object.values(touched).some(item => item)) {
      return false;
    }
    return true;
  }

  getError = (field) => {
    const {
      touched, error,
    } = this.state;
    if (!touched[field]) {
      return false;
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

  render() {
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.root} elevation={10}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <br />
          {this.renderComponent('outlined-email-input',
            'Email Address',
            'email',
            'email',
            <Email />)}
          {this.renderComponent('outlined-password-input',
            'Password',
            'password',
            'password',
            <VisibilityOff />)}
          <Button
            fullWidth
            className={classes.button}
            variant="contained"
            disabled={this.hasError()}
            color="primary"
          >
            SIGN IN
          </Button>
        </Paper>
      </>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};
export default withStyles(styles)(Login);
