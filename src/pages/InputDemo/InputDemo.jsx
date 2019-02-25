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

  getError = field => () => {
    const {
      name,
      sport,
      sportChoice,
      touched,
      error,
    } = this.state;
    if (touched[field]) {
      this.schema
        .validate({ name, sport, sportChoice }, { abortEarly: false })
        .catch((err) => {
          err.inner.forEach((element) => {
            if (element.path === field) {
              this.setState({
                error: { ...error, [field]: element.message },
                touched: { ...touched, [field]: false },
              });
            }
          });
        });
    }
  }

  isDisabled = () => {
    const {
      error,
      touched,
      name,
      sport,
      sportChoice,
    } = this.state;
    if (!Object.values(error).some(item => item) || Object.values(touched).some(item => item)) {
      if (name.length > 2 && sport.length !== 0 && sportChoice.length !== 0) {
        return false;
      }
      return true;
    }
    return true;
  }

  hasError = (field) => {
    const { error, touched } = this.state;
    if (error[field].length === 0 && !touched[field]) {
      return true;
    }
    return false;
  }

  isTouched = field => () => {
    const {
      touched,
    } = this.state;
    this.setState({
      touched: { ...touched, [field]: true },
    });
  }

  handleChange = field => (event) => {
    const { error } = this.state;
    if (!this.hasError(field)) {
      if (field === 'sport') {
        this.setState({
          [field]: event.target.value,
          sportChoice: '',
          error: { ...error, [field]: '' },
        });
      } else {
        this.setState({
          [field]: event.target.value,
          error: { ...error, [field]: '' },
        });
      }
    }
  }

  render() {
    const {
      name,
      sport,
      sportChoice,
      error,
    } = this.state;
    return (
      <>
        <h4> Name </h4>
        <TextField
          value={name}
          error={error.name}
          onClick={this.isTouched('name')}
          onChange={this.handleChange('name')}
          onBlur={this.getError('name')}
        />
        <h4> Select the game you play? </h4>
        <SelectField
          error={error.sport}
          value={sport}
          options={constants.options}
          onClick={this.isTouched('sport')}
          onChange={this.handleChange('sport')}
          onBlur={this.getError('sport')}
        />
        {sport ? (
          <>
            <h4> What you do? </h4>
            <RadioGroup
              value={sportChoice}
              error={error.sportChoice}
              options={constants[sport]}
              onClick={this.isTouched('sportChoice')}
              onChange={this.handleChange('sportChoice')}
              onBlur={this.getError('sportChoice')}
            />
          </>
        ) : (
          ''
        )}
        <p style={{ textAlign: 'right' }}>
          <Button value="Cancel" disabled={false} />
          <Button value="Submit" disabled={this.isDisabled()} buttonStyle={style.successColor} />
        </p>
      </>
    );
  }
}
export default InputDemo;
