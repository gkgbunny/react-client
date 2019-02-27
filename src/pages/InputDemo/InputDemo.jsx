import React, { Component } from 'react';
import * as yup from 'yup';
import { style } from '../../components/Button';
import {
  TextField,
  SelectField,
  RadioGroup,
  Button,
} from '../../components';
import constants from '../../config/constants';

class InputDemo extends Component {
  schema = yup.object().shape({
    name: yup.string().min(3).required(),
    sport: yup.string().required(),
    sportChoice: yup.string().required(),
  });

  constructor() {
    super();
    this.state = {
      name: '',
      sport: '',
      sportChoice: '',
      error: {
        name: '',
        sport: '',
        sportChoice: '',
      },
      touched: {
        name: false,
        sport: false,
        sportChoice: false,
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
      sport,
      sportChoice,
    } = this.state;
    console.log({ name, sport, sportChoice });
    this.schema
      .validate({ name, sport, sportChoice }, { abortEarly: false })
      .then(() => {
        this.handleError(null);
      })
      .catch((err) => {
        console.log(err);
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
      name,
      sport,
      sportChoice,
      error,
      touched,
    } = this.state;
    if (!Object.values(error).some(item => item) || Object.values(touched).some(item => item)) {
      if (name.length > 2 && sport.length !== 0 && sportChoice.length !== 0) {
        return false;
      }
      return true;
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
    const { error } = this.state;
    if (field === 'sport') {
      this.setState({
        [field]: event.target.value,
        sportChoice: '',
        error: { ...error, [field]: '' },
      }, this.validateForm);
    } else {
      this.setState({
        [field]: event.target.value,
        error: { ...error, [field]: '' },
      }, this.validateForm);
    }
  }

  render() {
    const {
      name,
      sport,
      sportChoice,
    } = this.state;
    return (
      <>
        <h4> Name </h4>
        <TextField
          value={name}
          error={this.getError('name')}
          onChange={this.handleChange('name')}
          onBlur={this.isTouched('name')}
        />
        <h4> Select the game you play? </h4>
        <SelectField
          value={sport}
          error={this.getError('sport')}
          options={constants.options}
          onChange={this.handleChange('sport')}
          onBlur={this.isTouched('sport')}
        />
        {sport ? (
          <>
            <h4> What you do? </h4>
            <RadioGroup
              value={sportChoice}
              options={constants[sport]}
              error={this.getError('sportChoice')}
              onChange={this.handleChange('sportChoice')}
              onBlur={this.isTouched('sportChoice')}
            />
          </>
        ) : (
          ''
        )}
        <p style={{ textAlign: 'right' }}>
          <Button value="Cancel" disabled={false} />
          <Button value="Submit" disabled={!this.isTouched() || this.hasError()} buttonStyle={style.successColor} />
        </p>
      </>
    );
  }
}
export default InputDemo;
