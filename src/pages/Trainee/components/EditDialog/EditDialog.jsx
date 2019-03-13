/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import TextField from '@material-ui/core/TextField';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import { SnackBarContextConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';
import callApi from '../../../../libs/utils/api';

const styles = () => ({
  progress: {
    color: green[800],
  },
});

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: {
        name: false,
        email: false,
      },
      loading: false,
      password: '',
      name: '',
      email: '',
    };
  }

  isTouched = field => () => {
    const {
      touched,
    } = this.state;
    this.setState({
      touched: { ...touched, [field]: true },
    }, this.handleChange);
  }

  hasError = () => {
    const {
      touched,
      loading,
    } = this.state;
    if (Object.values(touched).every(item => item) && !loading) {
      return false;
    }
    return true;
  }

  renderComponent = (id, label, type, name, value, icon) => (
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
      defaultValue={value}
      onBlur={this.isTouched(name)}
      onChange={this.handleChange(name, value)}
    />
  )

  handleChange = (field, value) => (event) => {
    console.log(event, '55555555555555555555555555', value);
    this.setState({
      [field]: event.target.value,
    });
  }

  handleSubmit = async (e, openSnackBar) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const { onClose, data } = this.props;
    const storedToken = localStorage.getItem('token');
    this.setState({
      loading: true,
    });
    try {
      const response = await callApi('/trainee', 'PUT', {
        name,
        email,
        password,
        id: data._id,
      }, storedToken);
      if (response.statusText === 'OK') {
        this.setState({
          touched: {
            name: false,
            email: false,
          },
          loading: false,
        });
        openSnackBar(response.data.message, 'success');
        onClose();
      }
    } catch (error) {
      this.setState({
        touched: {
          name: false,
          email: false,
        },
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
      data,
      classes,
    } = this.props;
    const { loading } = this.state;
    return (
      <>
        <Dialog open={open} onClose={onClose} maxWidth={maxWidth}>
          <DialogTitle id="alert-dialog-title">Edit Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Enter your trainee details
              {this.renderComponent('outlined-name-input',
                'Name',
                'name',
                'name',
                data.name,
                <Person />)}
              {this.renderComponent('outlined-email-input',
                'Email Address',
                'email',
                'email',
                data.email,
                <Email />)}
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
                  variant="contained"
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
EditDialog.propTypes = {
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.bool,
  data: PropTypes.objectOf,
  classes: PropTypes.objectOf.isRequired,
};
EditDialog.defaultProps = {
  onClose: () => {},
  open: 'false',
  data: {},
};
export default withStyles(styles)(EditDialog);
