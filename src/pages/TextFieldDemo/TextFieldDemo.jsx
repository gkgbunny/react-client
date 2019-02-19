import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <>
    <h4> This is a Disabled Input </h4>
    <TextField value="Disabled Input" disabled />

    <h4> A Valid Input </h4>
    <TextField value="Accessible" />

    <h4> An Input with errors</h4>
    <TextField value="101" error="Could not be greater than" />
  </>
);
export default TextFieldDemo;
