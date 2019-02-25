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
      radioValue: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSportChange = (event) => {
    this.setState({ sport: event.target.value, cricket: '', football: '' });
  }

  handleOptionChange = (event) => {
    const { sport } = this.state;
    this.setState({
      [sport]: event.target.value,
      radioValue: event.target.value,
    });
  }

  render() {
    const {
      name,
      sport,
      radioValue,
    } = this.state;
    console.log(this.state);

    return (
      <>
        <h4> Name </h4>
        <TextField value={name} error="must only accept string" onChange={this.handleNameChange} />
        <h4> Select the game you play? </h4>
        <SelectField value="" error="must only accept string" options={constants.options} onChange={this.handleSportChange} />
        {(sport)
          ? <h4> What you do? </h4>
          : ''}
        <RadioGroup value={radioValue} error="must only accept string" options={constants[sport]} onChange={this.handleOptionChange} />
      </>
    );
  }
}
export default InputDemo;
