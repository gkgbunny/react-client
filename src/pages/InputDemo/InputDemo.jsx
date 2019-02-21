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
    name: yup.string().required().min(3),
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
      errors: '',
      touched: false,
    };
  }

  validaters = () => {
    console.log('In Validate');
    const { name, sport, sportChoice } = this.state;
    // const { name } = error;
    this.schema
      .validate({ name, sport, sportChoice }, { abortEarly: false })
      .catch((err) => {
        err.inner.forEach((element) => {
          console.log(element.message);
          this.setState({ errors: element.message });
        });
      });
  }

  handleChange = field => (event) => {
    console.log('In handleChange');
    this.setState({
      [field]: event.target.value,
      cricket: '',
      football: '',
    });
    this.state.touched = true;
  };

  handleOptionChange = (event) => {
    const { sport } = this.state;
    this.setState({
      [sport]: event.target.value,
      sportChoice: event.target.value,
    });
  };

  render() {
    const {
      name,
      sport,
      sportChoice,
      touched,
      errors,
    } = this.state;
    console.log(this.state);
    return (
      <>
        <h4> Name </h4>
        <TextField
          value={name}
          error={errors}
          onClick={this.handleChange('name')}
          onChange={this.handleChange('name')}
          onBlur={this.validaters}
          isTouched={touched.name}
        />
        <h4> Select the game you play? </h4>
        <SelectField
          error="must only accept string"
          options={constants.options}
          onChange={this.handleChange('sport')}
        />
        {sport ? (
          <>
            <h4> What you do? </h4>
            <RadioGroup
              value={sportChoice}
              error="must only accept string"
              options={constants[sport]}
              onChange={this.handleOptionChange}
            />
          </>
        ) : (
          ''
        )}
        <p style={{ textAlign: 'right' }}>
          <Button value="Cancel" style={style.base} disabled={false} />
          <Button value="Submit" style={style.base} disabled={touched} onClick={this.validateHandler} />
        </p>
      </>
    );
  }
}
export default InputDemo;
