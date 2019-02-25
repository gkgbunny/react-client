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
    if (operator === '+') {
      result = first + second;
    } else if (operator === '-') {
      result = first - second;
    } else if (operator === '*') {
      result = first * second;
    } else if (operator === '/') {
      result = first / second;
    } else {
      return 'Invalid Operation';
    }
    return result;
  };

  const result = calculate();
  return (
    <p>
      {children(first, second, operator, result)}
    </p>
  );
};
Math.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};
Math.defaultProps = {
  children: () => {},
};
export default Math;
