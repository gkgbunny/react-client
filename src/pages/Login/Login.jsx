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
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, Avatar } from '@material-ui/core';
import { Footer } from '../../layouts/components';
import callApi from '../../libs/utils/api';
import { SnackBarContextConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';

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
  progress: {
    color: green[800],
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
      return false;
    }
    return error[field];
  }

  handleChange = field => (event) => {
    this.setState({
      [field]: event.target.value,
    }, this.validateForm);
  }

  handleSubmit = async (e, openSnackBar) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;
    this.setState({
      email: e.target.value,
      password: e.target.value,
      loading: true,
    });
    try {
      const response = await callApi('/user/login', 'POST', email, password);
      if (response.statusText === 'OK') {
        this.setState({
          loading: false,
        });
        localStorage.setItem('token', response.data.data);
        history.push('/trainee');
      }
    } catch (error) {
      this.setState({
        loading: false,
      });
      openSnackBar('This is an error message', 'error');
    }
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
    const { loading } = this.state;
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
          <SnackBarContextConsumer>
            {({ openSnackBar }) => (
              <Button
                fullWidth
                className={classes.button}
                variant="contained"
                disabled={this.hasError()}
                color="primary"
                onClick={e => this.handleSubmit(e, openSnackBar)}
              >
                {loading ? <CircularProgress className={classes.progress} /> : 'SIGN IN'}
              </Button>
            )}
          </SnackBarContextConsumer>
        </Paper>
        <Footer />
      </>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  history: PropTypes.objectOf,
};
Login.defaultProps = {
  history: {},
};
export default withStyles(styles)(Login);
