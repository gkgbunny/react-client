import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Person from '@material-ui/icons/Person';
import Email from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import trainees from '../../data/trainee';
import { NoMatch } from '../../../NoMatch';

class EditDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      touched: {
        name: false,
        email: false,
      },
    };
  }

  isTouched = field => () => {
    const {
      touched,
    } = this.state;
    this.setState({
      touched: { ...touched, [field]: true },
    });
  }

  hasError = () => {
    const {
      touched,
    } = this.state;
    if (Object.values(touched).some(item => item)) {
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
    />
  )

  render() {
    const {
      open,
      onClose,
      maxWidth,
      id,
    } = this.props;
    if (trainees.some(trainee => trainee.id === id)) {
      const item = trainees.filter(trainee => trainee.id === id);
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
                  item[0].name,
                  <Person />)}
                {this.renderComponent('outlined-email-input',
                  'Email Address',
                  'email',
                  'email',
                  item[0].email,
                  <Email />)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="primary">
                CANCEL
              </Button>
              <Button
                onClick={onClose}
                variant="contained"
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
    return <NoMatch />;
  }
}
EditDialog.propTypes = {
  onClose: PropTypes.func,
  maxWidth: PropTypes.string.isRequired,
  open: PropTypes.bool,
  id: PropTypes.string,
};
EditDialog.defaultProps = {
  onClose: () => {},
  open: 'false',
  id: '',
};
export default EditDialog;
