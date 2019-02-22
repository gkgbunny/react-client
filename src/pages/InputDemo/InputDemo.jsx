import React, { Component } from 'react';
import * as yup from 'yup';
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
      cricket: '',
      football: '',
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
    console.log('In getError----------------', field);
    const {
      name,
      sport,
      sportChoice,
      error,
    } = this.state;
    this.schema
      .validate({ name, sport, sportChoice }, { abortEarly: false })
      .catch((err) => {
        err.inner.forEach((element) => {
          if (element.path === field) {
            this.setState({
              error: { ...error, [field]: element.message },
            });
          }
        });
      });
  }

  hasError = (field) => {
    console.log('In hasError**********', field);
    const { error } = this.state;
    if (field.length !== 0) {
      console.log('inside IF +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
      this.setState({
        error: { ...error, [field]: '' },
      });
      return false;
    }
    return true;
  }

  isTouched = () => {
    const { touched, error } = this.state;
    console.log('Inside isTouched /////////////////////////', Object.values(touched).some(item => item));
    console.log(Object.values(error).some(item => item));
    if (!Object.values(error).some(item => item)) {
      if (Object.values(touched).some(item => item)) {
        return false;
      }
      return true;
    }
    return true;
  }

  handleChange = field => (event) => {
    console.log('In handleChange');
    const { touched } = this.state;
    this.setState({
      [field]: event.target.value,
      cricket: '',
      football: '',
      touched: { ...touched, [field]: true },
    });
    this.hasError(field);
  };

  render() {
    const {
      name,
      sport,
      sportChoice,
      error,
    } = this.state;
    console.log('In render');
    console.log(this.state);

    return (
      <>
        <h4> Name </h4>
        <TextField
          value={name}
          error={error.name}
          onChange={this.handleChange('name')}
          onBlur={this.getError('name')}
        />
        <h4> Select the game you play? </h4>
        <SelectField
          error={error.sport}
          options={constants.options}
          onChange={this.handleChange('sport')}
          onBlur={this.getError('sport')}
          // isTouched={touched}
        />
        {sport ? (
          <>
            <h4> What you do? </h4>
            <RadioGroup
              value={sportChoice}
              error={error.sportChoice}
              options={constants[sport]}
              onChange={this.handleChange('sportChoice')}
              onBlur={this.getError('sportChoice')}
              // isTouched={touched}
            />
          </>
        ) : (
          ''
        )}
        <p style={{ textAlign: 'right' }}>
          <Button value="Cancel" disabled={false} />
          <Button value="Submit" disabled={this.isTouched()} />
        </p>
      </>
    );
  }
}
export default InputDemo;
