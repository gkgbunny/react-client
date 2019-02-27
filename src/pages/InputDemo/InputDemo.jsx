import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import constants from '../../config/constants';

class InputDemo extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
    };
  }

  handleChange = name => event => this.setState({ [name]: event.target.value });

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value, cricket: '', football: '' });
  }

  render() {
    const {
      name,
      sport,
      cricket,
      football,
    } = this.state;
    const radioValue = sport === 'cricket' ? cricket : football;
    return (
      <>
        <h4> Name </h4>
        <TextField value={name} error="must only accept string" onChange={this.handleChange('name')} />
        <h4> Select the game you play? </h4>
        <SelectField value={sport} error="must only accept string" options={constants.options} onChange={this.handleSportChange} />
        {(sport)
          ? <h4> What you do? </h4>
          : ''}
        <RadioGroup value={radioValue} error="must only accept string" options={constants[sport]} onChange={this.handleChange(sport)} />
      </>
    );
  }
}
export default InputDemo;
