import React from 'react';
import { Math } from '../../components';
import { Navbar } from '../../layouts';

const ChildrenDemo = () => (
  <>
    <Navbar />
    <Math first={7} second={4} operator="+">
      {
        (first, second, operator, result) => (
          `${first} ${operator} ${second} = ${result}`
        )
      }
    </Math>
    <Math first={7} second={4} operator="-">
      {
        (first, second, operator, result) => (
          `Substraction of ${first} and ${second} is ${result}`
        )
      }
    </Math>
    <Math first={7} second={4} operator="*">
      {
        (first, second, operator, result) => (
          `When we multiply ${first} and ${second} we will get ${result} as result`
        )
      }
    </Math>
    <Math first={7} second={0} operator="/">
      {
        (first, second, operator, result) => (
          `${first} ${operator} ${second} = ${result}`
        )
      }
    </Math>
    <Math first={7} second={5} operator="^">
      {
        (first, second, operator, result) => (
          `${first} ${operator} ${second} = ${result}`
        )
      }
    </Math>
    <Math first={8} second={2} operator="/" />
  </>
);
export default ChildrenDemo;
