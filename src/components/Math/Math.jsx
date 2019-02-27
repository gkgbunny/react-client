import React from 'react';
import PropTypes from 'prop-types';

const Math = (props) => {
  const {
    first,
    second,
    operator,
    children,
  } = props;

  const calculate = () => {
    let result;
    switch (operator) {
    case '+': result = first + second;
      break;
    case '-': result = first - second;
      break;
    case '*': result = first * second;
      break;
    case '/': result = first / second;
      break;
    default: result = 'Invalid Operation';
      break;
    }
    return result;
  };

  const result = calculate();
  return (
    <>
      {children
        ? children(first, second, operator, result)
        : `${first} ${operator} ${second} = ${result}`
      }
      <br />
    </>
  );
};
Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};
Math.defaultProps = {
  children: null,
};
export default Math;
